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
}

module.exports = CRUDService;
