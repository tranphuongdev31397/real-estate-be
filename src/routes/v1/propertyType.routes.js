const { ROLES } = require("../../contants/roles");
const {
  signUpController,
  signInController,
  signOutController,
  refreshTokenController,
} = require("../../controllers/access.controller");
const {
  getPropertiesType,
} = require("../../controllers/property-type.controller");
const { SuccessResponse } = require("../../core/success.response");
const { authenticateHandler, permissionHandler } = require("../../middlewares");
const asyncHandler = require("../../middlewares/asyncHandler");
const db = require("../../models");
const { getAllPropertyTypes } = require("../../services/property-type.service");

const propertyTypeRoutes = require("express").Router();

propertyTypeRoutes.get("/", asyncHandler(getPropertiesType));

module.exports = propertyTypeRoutes;
