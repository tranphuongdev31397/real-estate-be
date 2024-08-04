const db = require("../models");
const {
  filterHandler,
  searchByDefault,
  sortHandler,
} = require("../utils/queryHandler");

class PropertyTypeService {
  static async getAllPropertyTypes({ filters, search, sort }) {
    const searchDefault = searchByDefault(search, ["name"]);

    const whereOptions = filterHandler({ filters, search: searchDefault });
    const sortOptions = sortHandler(sort);

    const propertyTypes = await db.PropertyType.findAll({
      where: whereOptions,
      order: sortOptions,
    });
    return propertyTypes;
  }
}

module.exports = PropertyTypeService;
