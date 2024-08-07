const { BadRequestError } = require("../core/error.response");
const db = require("../models");
const {
  filterHandler,
  sortHandler,
  applyDefaultSearchBy,
  getPaginationParams,
} = require("../utils/queryHandler");

class PropertyTypeService {
  static async getAllPropertyTypes({ filters, search, sort, page, limit }) {
    const searchDefault = applyDefaultSearchBy(search, ["name"]);
    const whereParams = filterHandler({ filters, search: searchDefault });
    const sortParams = sortHandler(sort);
    const paginationParams = getPaginationParams({ page, limit });

    const response = await db.PropertyType.findAndCountAll({
      where: whereParams,
      order: sortParams,
      ...paginationParams,
    });

    if (!response) {
      throw new BadRequestError("Couldn't find PropertyType");
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

module.exports = PropertyTypeService;
