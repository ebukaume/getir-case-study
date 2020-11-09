const joi = require('joi');
const { badRequest } = require('../utils/response');

const customDateValidator = (value) => {
  if (!value.match(/^(\d{4})-(\d{2})-(\d{2})$/)) {
    throw new Error('of invalid date format! Allowed format is "YYYY-MM-DD"');
  }

  return value;
};

const fetchRequestSchema = joi.object({
  startDate: joi.custom(customDateValidator).required(),
  endDate: joi.custom(customDateValidator).required(),
  minCount: joi.number().integer().required(),
  maxCount: joi.number().integer().required(),
});

const validateRecordFetchRequest = async (req, res, next) => {
  try {
    await fetchRequestSchema.validateAsync(req.body, { abortEarly: false, convert: false });

    return next();
  } catch (err) {
    return badRequest(res, err.message);
  }
};

module.exports = {
  validateRecordFetchRequest,
};
