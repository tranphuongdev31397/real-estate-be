"use strict";

const {
  BadRequestError,
  ConflictRequestError,
} = require("../core/error.response");
const db = require("../models");
const { removeUndefinedAndNullNestedObject } = require("../utils");
const {
  getPaginationParams,
  sortHandler,
  filterHandler,
  applyDefaultSearchBy,
} = require("../utils/queryHandler");

class CRUDService {
  constructor({ model }) {
    this.model = model;
  }

  async getList({ filters, search, sort, page, limit, join, options }) {
    const { searchDefault, ...opts } = options || {};
    const searchBy = applyDefaultSearchBy(search, searchDefault);
    const whereParams = filterHandler({ filters, search: searchBy });
    const sortParams = sortHandler(sort);
    const paginationParams = getPaginationParams({ page, limit });

    const response = await this.model.findAndCountAll({
      where: {
        ...whereParams,
      },
      order: sortParams,
      ...opts,
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

  async getOne({ id }) {
    const response = await this.model.findByPk(id);

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
    const response = await this.model.destroy({ where: { id } });

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
    return {
      data: itemFound,
    };
  }
}

module.exports = CRUDService;
