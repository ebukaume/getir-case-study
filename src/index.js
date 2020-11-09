const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const { connectDatabase } = require('./utils/db');
const { logger } = require('./utils/logger');
const { startServer } = require('./server');

dotenv.config();

if (!process.env.DB_URL) {
  logger.error('Missing required environment variable DB_URL');
  process.exit(0);
}

const app = express();

app.use(cors());
app.set('trust proxy', true);

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'), { stream: { write: (message) => logger.info(message) } });
} else {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase()
  .then(() => startServer(app).catch((err) => logger.error(err)))
  .catch((err) => logger.error(err));
