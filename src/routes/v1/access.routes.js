const {
  signUpController,
  signInController,
  signOutController,
} = require("../../controllers/access.controller");
const { BadRequestError } = require("../../core/error.response");
const { SuccessResponse } = require("../../core/success.response");
const { authenticateHandler } = require("../../middlewares");
const asyncHandler = require("../../middlewares/asyncHandler");

const accessRoutes = require("express").Router();

accessRoutes.post("/sign-up", asyncHandler(signUpController));
accessRoutes.post("/sign-in", asyncHandler(signInController));

// ===== Authentication routes =====
accessRoutes.use(authenticateHandler);
accessRoutes.get(
  "/get-info",
  asyncHandler((req, res) => {
    new SuccessResponse({ metadata: req.userInfo }).send(res);
  })
);

accessRoutes.get("/sign-out", asyncHandler(signOutController));
module.exports = accessRoutes;
