const historyService = require("../services/historyService");
const ApiResponse = require("../utils/ApiResponse");

const getAll = async (req, res, next) => {
  try {
    const result = await historyService.getAll(req.user._id, req.query);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
};

const deleteEntry = async (req, res, next) => {
  try {
    await historyService.delete(req.user._id, req.params.id);
    ApiResponse.success(res, null, "History entry deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  delete: deleteEntry,
};
