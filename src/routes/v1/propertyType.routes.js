const {
  getPropertiesType,
  getOnePropertyType,
  deleteOnePropertyType,
  deleteManyPropertyTypes,
  createPropertyType,
  updatePropertyType,
} = require("../../controllers/property-type.controller");
const asyncHandler = require("../../middlewares/asyncHandler");

const propertyTypeRoutes = require("express").Router();

propertyTypeRoutes.get("/", asyncHandler(getPropertiesType));
propertyTypeRoutes.get("/:id", asyncHandler(getOnePropertyType));
propertyTypeRoutes.post("/", asyncHandler(createPropertyType));
propertyTypeRoutes.delete("/:id", asyncHandler(deleteOnePropertyType));
propertyTypeRoutes.patch("/:id", asyncHandler(updatePropertyType));
propertyTypeRoutes.post("/delete-many", asyncHandler(deleteManyPropertyTypes));

module.exports = propertyTypeRoutes;
