const db = require("../models");
const CRUDService = require("./CRUD.service");

class MediaService extends CRUDService {
  constructor() {
    super({ model: db.Media });
  }
}

module.exports = new MediaService();
