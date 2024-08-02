const db = require("../models");
const { filterHandler } = require("../utils/queryHandler");

class PropertyTypeService {
  static async getAllPropertyTypes({ filters }) {
    const propertyTypes = await db.PropertyType.findAll({
      where: filterHandler(filters),
    });
    return propertyTypes;
  }
}

module.exports = PropertyTypeService;
