const { fetchRecordsWithinRange } = require('../services/records');
const { ok, internalServerError } = require('../utils/response');

const fetchRecords = async (req, res) => {
  try {
    const records = await fetchRecordsWithinRange(req.body);
    return ok(res, records);
  } catch (err) {
    return internalServerError(req, res, err);
  }
};

module.exports = {
  fetchRecords,
};
