const crypto = require("crypto");
const User = require("../models/User");
const History = require("../models/History");
const ApiError = require("../utils/ApiError");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateToken");
const config = require("../config");
const sendEmail = require("../utils/sendEmail");

class AuthService {
  async register({ fullName, email, phone, password }) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const user = await User.create({ fullName, email, phone, password });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    await History.create({
      user: user._id,
      action: "REGISTER",
      resource: "User",
      resourceId: user._id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    await History.create({
      user: user._id,
      action: "LOGIN",
      resource: "User",
      resourceId: user._id,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async logout(userId) {
    const user = await User.findById(userId).select("+refreshToken");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });

    await History.create({
      user: userId,
      action: "LOGOUT",
      resource: "User",
      resourceId: userId,
    });
  }

  async refreshAccessToken(refreshToken) {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(refreshToken);
    } catch {
      throw new ApiError(401, "Invalid or expired refresh token");
    }

    const user = await User.findById(decoded.id).select("+refreshToken");
    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    return user;
  }

  async forgotPassword(email) {
    const user = await User.findOne({ email });
    if (!user) {
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Use this link: ${resetUrl}\nThis link expires in 1 hour.`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new ApiError(500, "Failed to send reset email");
    }
  }

  async resetPassword(token, newPassword) {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      throw new ApiError(400, "Invalid or expired reset token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.refreshToken = undefined;
    await user.save();
  }
}

module.exports = new AuthService();
