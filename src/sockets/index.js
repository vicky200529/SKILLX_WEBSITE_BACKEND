const { verifyAccessToken } = require("../utils/generateToken");
const User = require("../models/User");

const setupSocket = (io) => {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.query?.token;
      if (!token) {
        return next(new Error("Authentication required"));
      }
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.id);
      if (!user) {
        return next(new Error("User not found"));
      }
      socket.user = user;
      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.user.email} (${socket.id})`);

    socket.join(`user:${socket.user._id}`);

    socket.emit("connected", {
      message: "Welcome to SKILLX",
      userId: socket.user._id,
    });

    socket.on("subscribe:notifications", () => {
      socket.join(`notifications:${socket.user._id}`);
    });

    socket.on("unsubscribe:notifications", () => {
      socket.leave(`notifications:${socket.user._id}`);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${socket.user.email} (${reason})`);
    });
  });
};

module.exports = setupSocket;
