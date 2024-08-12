const CRUDService = require("./CRUD.service");
const db = require("../models");

class PropertyTypeService extends CRUDService {
  constructor() {
    super({ model: db.PropertyType });
  }
}

module.exports = new PropertyTypeService();
