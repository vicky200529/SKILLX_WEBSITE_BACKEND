const User = require("../models/User");
const ApiError = require("../utils/ApiError");

class UserService {
  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }

  async updateProfile(userId, updateData) {
    const { fullName, phone, email } = updateData;

    if (email) {
      const existing = await User.findOne({ email, _id: { $ne: userId } });
      if (existing) {
        throw new ApiError(409, "Email is already in use");
      }
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { ...(fullName && { fullName }), ...(phone && { phone }), ...(email && { email }) },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async deleteProfile(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  }
}

module.exports = new UserService();
