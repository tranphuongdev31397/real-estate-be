const router = require("express").Router();

const version = "/api/v1";

router.use(`${version}/auth`, require("./access.routes"));
router.use(`${version}/property-types`, require("./propertyType.routes"));

module.exports = router;
