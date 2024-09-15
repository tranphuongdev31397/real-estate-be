"use strict";

const {
  BadRequestError,
  ConflictRequestError,
  ServerError,
} = require("../core/error.response");
const db = require("../models");
const { removeUndefinedAndNullNestedObject } = require("../utils");
const {
  getPaginationParams,
  sortHandler,
  filterHandler,
  applyDefaultSearchBy,
} = require("../utils/queryHandler");
const { associationMedia } = require("../utils/request");
const {
  createRelation,
  updateRelation,
  deleteMedia,
  deleteManyMedia,
} = require("../repositories/media.repo");

class CRUDService {
  constructor({ model, withMedia = "" }) {
    this.model = model;
    this.withMedia = withMedia;
  }

  async getList({ filters, search, sort, page, limit, sequelize, options }) {
    const { searchDefault } = options || {};
    const searchBy = applyDefaultSearchBy(search, searchDefault);
    const whereParams = filterHandler({ filters, search: searchBy });
    const sortParams = sortHandler(sort);
    const paginationParams = getPaginationParams({ page, limit });

    const associationParams = !!this.withMedia
      ? associationMedia({
          belongModel: this.model,
          foreignKey: this.withMedia,
        })
      : {};

    const response = await this.model.findAndCountAll({
      where: {
        ...whereParams,
      },
      order: sortParams,
      include: [associationParams],
      attributes: { exclude: [this.withMedia] },
      ...sequelize,
      ...paginationParams,
    });

    if (!response) {
      throw new BadRequestError(`Couldn't find ${this.model.name}`);
    }

    const { rows, count } = response;

    return {
      records: rows,
      limit: +limit,
      page: +page,
      total: count,
      totalPage: Math.ceil(count / limit),
    };
  }

  async getOne({ id, sequelize, options }) {
    const associationParams = !!this.withMedia
      ? associationMedia({
          belongModel: this.model,
          foreignKey: this.withMedia,
        })
      : {};
    const response = await this.model.findOne({
      where: {
        id,
      },
      include: [associationParams],
      attributes: { exclude: [this.withMedia] },
      ...sequelize,
    });

    if (!response) {
      throw new BadRequestError(
        `Couldn't find ${this.model.name} with id: ${id}`
      );
    }

    return response;
  }

  async create({
    body,
    find = undefined,
    options = {
      customError: () => {},
    },
  }) {
    let response;

    if (find) {
      const [data, isSuccess] = await this.model.findOrCreate({
        where: find,
        defaults: body,
      });

      if (!isSuccess) {
        if (options?.customError) {
          options?.customError?.(data);
        }
        throw new ConflictRequestError(`${this.model.name} already exists`);
      }

      response = data;
    } else {
      response = await this.model.create(body);
    }

    if (!response) {
      throw new BadRequestError(`Couldn't create ${this.model.name}`);
    }

    if (!!this.withMedia) {
      // Update relation
      const mediaId = body[this.withMedia]; // body[forigenKey];
      const created = await createRelation({
        mediaId,
        relationId: response.id,
        relationModel: this.model,
      });
      if (!created) {
        await this.model.destroy({ where: { id: relationId } });
        throw new ServerError(`Failed to create relation for media`);
      }
    }
    return {
      response,
    };
  }

  async update({
    body,
    id,
    options = {
      customError: () => {},
      shouldRemoveFalsyValue: true,
    },
  }) {
    if (options?.shouldRemoveFalsyValue) {
      body = removeUndefinedAndNullNestedObject(body);
    }

    const itemFound = await this.model.findByPk(id);

    if (!itemFound) {
      throw new BadRequestError(
        `Couldn't find ${this.model.name} with id: ${id}`
      );
    }

    const fieldMedia = this.withMedia;
    const bodyMediaId = body[fieldMedia]; // body[forigenKey];
    const dbMediaId = itemFound[fieldMedia];
    const shouldUpdateMedia =
      !!fieldMedia && !!bodyMediaId && bodyMediaId !== dbMediaId;

    if (shouldUpdateMedia) {
      // Update relation
      const updated = await updateRelation({
        mediaId: bodyMediaId,
        oldMediaId: dbMediaId,
        relationId: itemFound.id,
        relationModel: this.model,
      });

      if (!updated) {
        throw new ServerError(
          `Failed to update ${this.model.name} relation with media id: ${bodyMediaId}`
        );
      }
    }

    const response = await itemFound.update(body);

    if (!response) {
      throw new BadRequestError(
        `Couldn't update ${this.model.name} with id: ${id}`
      );
    }

    return {
      data: itemFound,
    };
  }

  async deleteOne({ id }) {
    const itemFound = await this.model.findByPk(id);
    if (!itemFound) {
      throw new BadRequestError(
        `Couldn't find ${this.model.name} with id: ${id}`
      );
    }
    const response = await itemFound.destroy();

    if (!!this.withMedia) {
      const dbMediaId = itemFound[this.withMedia];
      const deleted = await deleteMedia(dbMediaId);
    }

    if (!response) {
      throw new BadRequestError(
        `Couldn't delete ${this.model.name} with id: ${id}`
      );
    }

    return {
      data: itemFound,
    };
  }

  async deleteMany({ ids }) {
    if (!ids?.length) {
      throw new BadRequestError("No ids provided");
    }

    const itemFound = await this.model.findAll({
      where: { id: ids },
    });

    const response = await this.model.destroy({ where: { id: ids } });

    if (!response) {
      throw new BadRequestError(
        `Couldn't delete ${this.model.name} with id: ${ids}`
      );
    }

    if (!!this.withMedia) {
      const mediaIds = itemFound.map((item) => item[this.withMedia]);

      console.log(mediaIds);
      await deleteManyMedia(mediaIds);
    }

    return {
      data: itemFound,
    };
  }
}

module.exports = CRUDService;
