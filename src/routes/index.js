const swaggerUi = require('swagger-ui-express');
const { notFound, ok } = require('../utils/response');
const { recordRouter } = require('./record');
const swaggerDocument = require('../../swagger.json');

const API_PREFIX = '/api';

const bindRoutes = (app) => {
  app.use(`${API_PREFIX}/record/`, recordRouter);
  app.use(`${API_PREFIX}/status`, (req, res) => ok(res, { status: 'Online' }));

  app.use(`${API_PREFIX}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use((req, res) => notFound(res, 'Oops! Route not found. Please check the docs @ /api/docs'));
};

module.exports = {
  bindRoutes,
};
