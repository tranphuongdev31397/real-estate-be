const {
  signUpController,
  signInController,
} = require("../../controllers/access.controller");
const { authenticateHandler } = require("../../middlewares");
const asyncHandler = require("../../middlewares/asyncHandler");

const accessRoutes = require("express").Router();

accessRoutes.post("/sign-up", asyncHandler(signUpController));
accessRoutes.post("/sign-in", asyncHandler(signInController));

// ===== Authentication routes =====
accessRoutes.use(authenticateHandler);
accessRoutes.get("/get-info", (req, res) => {
  res.json(req.userInfo).send("Authenticated");
});
module.exports = accessRoutes;
