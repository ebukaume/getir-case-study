const { Router } = require('express');
const { fetchRecords } = require('../controllers/record');
const { validateRecordFetchRequest } = require('../middleware/validation');

const recordRouter = new Router();

recordRouter.post('/', validateRecordFetchRequest, fetchRecords);

module.exports = {
  recordRouter,
};
