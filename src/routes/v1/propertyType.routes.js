const { ROLES } = require("../../contants/roles");
const {
  getPropertiesType,
  getOnePropertyType,
  deleteOnePropertyType,
  deleteManyPropertyTypes,
  createPropertyType,
  updatePropertyType,
} = require("../../controllers/property-type.controller");
const { authenticateHandler, permissionHandler } = require("../../middlewares");
const asyncHandler = require("../../middlewares/asyncHandler");

const propertyTypeRoutes = require("express").Router();
propertyTypeRoutes.get("/", asyncHandler(getPropertiesType));
propertyTypeRoutes.get("/:id", asyncHandler(getOnePropertyType));

propertyTypeRoutes.post(
  "/",
  authenticateHandler,
  permissionHandler([ROLES.ADMIN]),
  asyncHandler(createPropertyType)
);
propertyTypeRoutes.delete(
  "/:id",
  authenticateHandler,
  permissionHandler([ROLES.ADMIN]),
  asyncHandler(deleteOnePropertyType)
);
propertyTypeRoutes.patch(
  "/:id",
  authenticateHandler,
  permissionHandler([ROLES.ADMIN]),
  asyncHandler(updatePropertyType)
);
propertyTypeRoutes.post(
  "/delete-many",
  authenticateHandler,
  permissionHandler([ROLES.ADMIN]),
  asyncHandler(deleteManyPropertyTypes)
);

module.exports = propertyTypeRoutes;
