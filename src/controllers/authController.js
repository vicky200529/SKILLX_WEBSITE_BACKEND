const authService = require("../services/authService");
const ApiResponse = require("../utils/ApiResponse");

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    ApiResponse.created(res, result, "Registration successful");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    ApiResponse.success(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    await authService.logout(req.user._id);
    ApiResponse.success(res, null, "Logout successful");
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const result = await authService.refreshAccessToken(req.body.refreshToken);
    ApiResponse.success(res, result, "Token refreshed successfully");
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user._id);
    ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  try {
    await authService.forgotPassword(req.body.email);
    ApiResponse.success(res, null, "If the email exists, a reset link has been sent");
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body.token, req.body.password);
    ApiResponse.success(res, null, "Password reset successful");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
};
