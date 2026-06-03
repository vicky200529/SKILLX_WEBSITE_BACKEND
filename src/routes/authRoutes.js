const { Router } = require("express");
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authLimiter } = require("../middlewares/rateLimiter");
const validate = require("../middlewares/validate");
const {
  registerValidator,
  loginValidator,
  refreshTokenValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../validators/authValidator");

const router = Router();

router.post("/register", authLimiter, registerValidator, validate, authController.register);
router.post("/login", authLimiter, loginValidator, validate, authController.login);
router.post("/logout", authenticate, authController.logout);
router.post("/refresh-token", refreshTokenValidator, validate, authController.refreshToken);
router.post("/forgot-password", authLimiter, forgotPasswordValidator, validate, authController.forgotPassword);
router.post("/reset-password", authLimiter, resetPasswordValidator, validate, authController.resetPassword);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
