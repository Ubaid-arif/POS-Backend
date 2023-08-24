const { httpStatusCodes } = require("../utils/common/constant");

class BaseError extends Error {
  constructor(name, statusCode, isOperational, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

class BadRequestError extends BaseError {
  constructor(
    description = "bad request",
    name,
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class InternalServerError extends BaseError {
  constructor(
    description = "Internal Server Error.",
    name = "Internal Server Error",
    statusCode = httpStatusCodes.INTERNAL_SERVER,
    isOperational = false
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class ForbiddenError extends BaseError {
  constructor(
    description = "Forbidden.",
    name = "Forbidden",
    statusCode = httpStatusCodes.FORBIDDEN,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}

class UnauthorizedError extends BaseError {
  constructor(
    description = "Unauthorized.",
    name = "Unauthorized",
    statusCode = httpStatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
module.exports = {
  BadRequestError,
  InternalServerError,
  ForbiddenError,
  UnauthorizedError,
};
