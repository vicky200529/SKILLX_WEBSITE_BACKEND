const analyticsService = require("../services/analyticsService");
const ApiResponse = require("../utils/ApiResponse");

const getDashboard = async (req, res, next) => {
  try {
    const data = await analyticsService.getDashboard(req.user._id);
    ApiResponse.success(res, data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
};
