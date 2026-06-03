const Translation = require("../models/Translation");
const History = require("../models/History");
const ApiError = require("../utils/ApiError");

class TranslationService {
  async create(userId, data) {
    const translation = await Translation.create({
      user: userId,
      ...data,
    });

    await History.create({
      user: userId,
      action: "CREATE_TRANSLATION",
      resource: "Translation",
      resourceId: translation._id,
    });

    return translation;
  }

  async getAll(userId, query = {}) {
    const { page = 1, limit = 20, sort = "-createdAt" } = query;
    const skip = (page - 1) * limit;

    const [translations, total] = await Promise.all([
      Translation.find({ user: userId })
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      Translation.countDocuments({ user: userId }),
    ]);

    return {
      translations,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async getById(userId, translationId) {
    const translation = await Translation.findOne({
      _id: translationId,
      user: userId,
    });
    if (!translation) {
      throw new ApiError(404, "Translation not found");
    }
    return translation;
  }

  async delete(userId, translationId) {
    const translation = await Translation.findOneAndDelete({
      _id: translationId,
      user: userId,
    });
    if (!translation) {
      throw new ApiError(404, "Translation not found");
    }

    await History.create({
      user: userId,
      action: "DELETE_TRANSLATION",
      resource: "Translation",
      resourceId: translationId,
    });
  }
}

module.exports = new TranslationService();
