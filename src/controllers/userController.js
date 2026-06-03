const userService = require("../services/userService");
const ApiResponse = require("../utils/ApiResponse");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id);
    ApiResponse.success(res, user);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user._id, req.body);
    ApiResponse.success(res, user, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteProfile = async (req, res, next) => {
  try {
    await userService.deleteProfile(req.user._id);
    ApiResponse.success(res, null, "Profile deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
