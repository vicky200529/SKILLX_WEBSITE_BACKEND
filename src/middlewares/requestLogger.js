const morgan = require("morgan");
const config = require("../config");

const requestLogger =
  config.nodeEnv === "development"
    ? morgan("dev")
    : morgan("combined");

module.exports = requestLogger;
