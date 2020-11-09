const mongoose = require('mongoose');
const { bindRoutes } = require('./routes');
const { logger } = require('./utils/logger');

const startServer = async (app) => {
  bindRoutes(app);
  const port = process.env.PORT || 4000;

  const server = app.listen(port, (err) => {
    if (err) throw err;
    logger.info(`Server started on port ${port}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close();
    server.close();
    logger.info('Successfully graciously shutdown the server!');
    process.exit(0);
  });
};

module.exports = {
  startServer,
};
