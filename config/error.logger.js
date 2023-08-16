const pino = require("pino");

const errorLogger = pino({
  level: "error", // Set the logging level to "error"
  // Add any other Pino configuration options here
});

module.exports = errorLogger;
