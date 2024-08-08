const { BadRequestError } = require("../core/error.response");
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

  async getList({ filters, search, sort, page, limit, options }) {
    const searchDefault = applyDefaultSearchBy(search, options?.searchDefault);
    const whereParams = filterHandler({ filters, search: searchDefault });
    const sortParams = sortHandler(sort);
    const paginationParams = getPaginationParams({ page, limit });

    const response = await this.model.findAndCountAll({
      where: whereParams,
      order: sortParams,
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

  async create({ data }) {}

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
