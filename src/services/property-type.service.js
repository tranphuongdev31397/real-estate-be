const CRUDService = require("./CRUD.service");
const db = require("../models");

class PropertyTypeService extends CRUDService {}

module.exports = new PropertyTypeService({ model: db.PropertyType });
