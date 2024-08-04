const { BadRequestError } = require("../core/error.response");
const db = require("../models");
const {
  filterHandler,
  searchByDefault,
  sortHandler,
  pagination,
} = require("../utils/queryHandler");

class PropertyTypeService {
  static async getAllPropertyTypes({ filters, search, sort, page, limit }) {
    const searchDefault = searchByDefault(search, ["name"]);

    const whereOptions = filterHandler({ filters, search: searchDefault });
    const sortOptions = sortHandler(sort);
    const paginate = pagination({ page, limit });

    if (paginate) {
      const response = await db.PropertyType.findAndCountAll({
        where: whereOptions,
        order: sortOptions,
        ...paginate,
      });

      if (!response) {
        throw new BadRequestError("Couldn't find PropertyType");
      }

      const { rows, count } = response;

      return {
        data: rows,
        paginate: {
          limit: +limit,
          page: +page,
          total: count,
        },
      };
    }

    const propertyTypes = await db.PropertyType.findAll({
      where: whereOptions,
      order: sortOptions,
    });

    if (!propertyTypes) {
      throw new BadRequestError("Couldn't find PropertyType");
    }
    return {
      data: propertyTypes,
    };
  }
}

module.exports = PropertyTypeService;
