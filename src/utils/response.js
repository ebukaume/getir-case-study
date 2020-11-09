const logger = require('./logger');
const { ERROR } = require('./constant');

const notFound = (res, message) => (
  res.status(404).json({
    success: false,
    error: ERROR.NOT_FOUND,
    message,
  })
);

const badRequest = (res, message) => (
  res.status(400).json({
    success: false,
    error: ERROR.VALIDATION_ERROR,
    message,
  })
);

const ok = (res, data) => (
  res.status(200).json({
    success: true,
    data,
  })
);

const notAuthorized = (req, res, message) => {
  logger.warn({
    message: 'UNAUTHORIZED ACCESS ATTEMPT',
    source: req.ip,
  });

  return res.status(401).json({
    success: false,
    error: ERROR.AUTHORIZATION_ERROR,
    message,
  });
};

const internalServerError = (req, res, error) => {
  logger.error({
    error: ERROR.INTERNAL_SERVER_ERROR,
    source: req.ip,
    message: error.message || error,
    stack: error.stack,
  });

  return res.status(500).json({
    success: false,
    error: ERROR.INTERNAL_SERVER_ERROR,
    message: error.message || error,
  });
};

module.exports = {
  ok,
  notFound,
  badRequest,
  notAuthorized,
  internalServerError,
};
