const {
  getPropertiesType,
  getOnePropertyType,
  deleteOnePropertyType,
  deleteManyPropertyTypes,
} = require("../../controllers/property-type.controller");
const asyncHandler = require("../../middlewares/asyncHandler");

const propertyTypeRoutes = require("express").Router();

propertyTypeRoutes.get("/", asyncHandler(getPropertiesType));
propertyTypeRoutes.get("/:id", asyncHandler(getOnePropertyType));
propertyTypeRoutes.delete("/:id", asyncHandler(deleteOnePropertyType));
propertyTypeRoutes.post("/delete-many", asyncHandler(deleteManyPropertyTypes));

module.exports = propertyTypeRoutes;
