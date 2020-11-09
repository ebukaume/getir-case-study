const logger = require('./logger');
const { ERROR } = require('./constant');

const RESPONSE_CODE = {
  success: {
    code: 0,
    message: 'Success',
  },
  failure: {
    code: 1,
    message: 'Failure',
  },
};

const failure = {
  code: RESPONSE_CODE.failure.code,
  msg: RESPONSE_CODE.failure.message,
};

const notFound = (res, message) => (
  res.status(404).json({
    ...failure,
    error: ERROR.NOT_FOUND,
    detail: message,
  })
);

const badRequest = (res, message) => (
  res.status(400).json({
    ...failure,
    error: ERROR.VALIDATION_ERROR,
    detail: message,
  })
);

const ok = (res, records) => (
  res.status(200).json({
    code: RESPONSE_CODE.success.code,
    msg: RESPONSE_CODE.success.message,
    records,
  })
);

const internalServerError = (req, res, error) => {
  const errorMessage = error.message || error;

  logger.error({
    error: ERROR.INTERNAL_SERVER_ERROR,
    source: req.ip,
    message: error.message || error,
    stack: error.stack,
  });

  return res.status(500).json({
    ...failure,
    error: ERROR.INTERNAL_SERVER_ERROR,
    detail: errorMessage,
  });
};

module.exports = {
  ok,
  notFound,
  badRequest,
  internalServerError,
};
