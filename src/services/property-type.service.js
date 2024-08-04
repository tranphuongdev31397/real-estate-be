const db = require("../models");
const { filterHandler, searchByDefault } = require("../utils/queryHandler");

class PropertyTypeService {
  static async getAllPropertyTypes({ filters, search, sort }) {
    const searchDefault = searchByDefault(search, ["name"]);

    const whereOptions = filterHandler({ filters, search: searchDefault });

    const propertyTypes = await db.PropertyType.findAll({
      where: whereOptions,
    });
    return propertyTypes;
  }
}

module.exports = PropertyTypeService;
