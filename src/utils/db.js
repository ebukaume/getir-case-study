const mongoose = require('mongoose');
const { logger } = require('./logger');

const connectDatabase = async () => {
  logger.info('Attempting to establish database connection');

  return mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

const dbCconnection = mongoose.connection;

dbCconnection.once('open', () => logger.info('Database connection established!'));
dbCconnection.on('error', () => logger.error('connection error:'));
dbCconnection.on('close', () => logger.warn('Database connection closed!'));

module.exports = {
  connectDatabase,
};
