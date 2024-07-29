const { ROLES } = require("../../contants/roles");
const {
  signUpController,
  signInController,
  signOutController,
  refreshTokenController,
} = require("../../controllers/access.controller");
const { BadRequestError } = require("../../core/error.response");
const { SuccessResponse } = require("../../core/success.response");
const { authenticateHandler, permissionHandler } = require("../../middlewares");
const asyncHandler = require("../../middlewares/asyncHandler");
const db = require("../../models");

const accessRoutes = require("express").Router();

accessRoutes.post("/sign-up", asyncHandler(signUpController));
accessRoutes.post("/sign-in", asyncHandler(signInController));

// ===== Authentication routes =====
// accessRoutes.use(authenticateHandler);

accessRoutes.get(
  "/get-info",
  authenticateHandler,
  permissionHandler([ROLES.ADMIN, ROLES.AGENT]),
  asyncHandler(async (req, res) => {
    const info = await db.User.findByPk(req.userInfo.id, {
      include: {
        model: db.Role,
        as: "roleDetail",
      },
    });
    new SuccessResponse({ metadata: info }).send(res);
  })
);

accessRoutes.get("/sign-out", asyncHandler(signOutController));

accessRoutes.get("/refresh-token", asyncHandler(refreshTokenController));

module.exports = accessRoutes;
