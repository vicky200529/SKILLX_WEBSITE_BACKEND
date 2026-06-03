const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const config = require("./config");
const routes = require("./routes");
const requestLogger = require("./middlewares/requestLogger");
const { globalLimiter } = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHandler");
const notFoundHandler = require("./middlewares/notFoundHandler");
const ApiResponse = require("./utils/ApiResponse");

const app = express();

app.use(helmet());
app.use(compression());
app.use(cookieParser());

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(mongoSanitize());

app.use(requestLogger);

app.use(globalLimiter);

app.get("/api/health", (req, res) => {
  ApiResponse.success(res, { status: "ok" });
});

app.use("/api", routes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
