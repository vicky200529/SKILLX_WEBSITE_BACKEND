const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const config = require("./config");
const connectDB = require("./config/database");
const setupSocket = require("./sockets");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.clientUrl,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

setupSocket(io);

const start = async () => {
  await connectDB();

  server.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });
};

start();

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    process.exit(0);
  });
});
