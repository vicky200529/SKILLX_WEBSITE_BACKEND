const History = require("../models/History");
const ApiError = require("../utils/ApiError");

class HistoryService {
  async getAll(userId, query = {}) {
    const { page = 1, limit = 20, sort = "-createdAt" } = query;
    const skip = (page - 1) * limit;

    const [history, total] = await Promise.all([
      History.find({ user: userId })
        .sort(sort)
        .skip(skip)
        .limit(Number(limit)),
      History.countDocuments({ user: userId }),
    ]);

    return {
      history,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async delete(userId, historyId) {
    const entry = await History.findOneAndDelete({
      _id: historyId,
      user: userId,
    });
    if (!entry) {
      throw new ApiError(404, "History entry not found");
    }
  }
}

module.exports = new HistoryService();
