const translationService = require("../services/translationService");
const ApiResponse = require("../utils/ApiResponse");

const create = async (req, res, next) => {
  try {
    const translation = await translationService.create(req.user._id, req.body);
    ApiResponse.created(res, translation, "Translation created successfully");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await translationService.getAll(req.user._id, req.query);
    ApiResponse.success(res, result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const translation = await translationService.getById(req.user._id, req.params.id);
    ApiResponse.success(res, translation);
  } catch (error) {
    next(error);
  }
};

const deleteTranslation = async (req, res, next) => {
  try {
    await translationService.delete(req.user._id, req.params.id);
    ApiResponse.success(res, null, "Translation deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  delete: deleteTranslation,
};
