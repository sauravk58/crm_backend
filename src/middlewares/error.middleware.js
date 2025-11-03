const ApiResponse = require('../utils/response.util');
const logger = require('../utils/logger.util');
const { HTTP_STATUS } = require('../config/constants');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}`, err);

  if (err.name === 'ValidationError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    const errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message
    }));
    return ApiResponse.error(res, statusCode, 'Validation failed', errors);
  }

  if (err.code === 11000) {
    statusCode = HTTP_STATUS.CONFLICT;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  if (err.name === 'CastError') {
    statusCode = HTTP_STATUS.BAD_REQUEST;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  if (err.name === 'JsonWebTokenError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  }

  return ApiResponse.error(res, statusCode, message);
};

const notFound = (req, res, next) => {
  const message = `Route ${req.originalUrl} not found`;
  logger.warn(message);
  return ApiResponse.error(res, HTTP_STATUS.NOT_FOUND, message);
};

module.exports = {
  errorHandler,
  notFound
};