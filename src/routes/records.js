const { Router } = require('express');
const { fetchRecords } = require('../controllers/records');
const { validateRecordFetchRequest } = require('../middleware/validation');

const recordRouter = new Router();

recordRouter.post('/', validateRecordFetchRequest, fetchRecords);

module.exports = {
  recordRouter,
};
