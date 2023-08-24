const errorLogger = require("./error.logger");
const BaseError = require("./exceptions");

function returnError(err, req, res, next) {
  errorLogger.error(err);
  res
    .status(err.statusCode || 500)
    .send(err.message || "oops something went wrong");
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

const caughtError = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const requestCaught = (req, res, next) => {
  errorLogger.info(req.body);
  next();
};

module.exports = {
  caughtError,
  returnError,
  isOperationalError,
  requestCaught,
};
