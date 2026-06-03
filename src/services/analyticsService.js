const Translation = require("../models/Translation");
const History = require("../models/History");
const User = require("../models/User");

class AnalyticsService {
  async getDashboard(userId) {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const [
      totalTranslations,
      monthlyTranslations,
      recentHistory,
      languagesUsed,
    ] = await Promise.all([
      Translation.countDocuments({ user: userId }),
      Translation.countDocuments({
        user: userId,
        createdAt: { $gte: startOfMonth },
      }),
      History.find({ user: userId })
        .sort("-createdAt")
        .limit(10)
        .lean(),
      Translation.distinct("targetLanguage", { user: userId }),
    ]);

    return {
      totalTranslations,
      monthlyTranslations,
      languagesCount: languagesUsed.length,
      languages: languagesUsed,
      recentActivity: recentHistory,
    };
  }
}

module.exports = new AnalyticsService();
