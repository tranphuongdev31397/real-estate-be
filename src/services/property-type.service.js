const CRUDService = require("./CRUD.service");
const db = require("../models");

class PropertyTypeService extends CRUDService {
  constructor() {
    super({ model: db.PropertyType, withMedia: "mediaId" });
  }
}

module.exports = new PropertyTypeService();
