const router = require("express").Router();

const version = "/api/v1";

router.use(`${version}/auth`, require("./access.routes"));

module.exports = router;
