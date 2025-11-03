const app = require('./app');
const connectDB = require('./config/database');
const { port, nodeEnv } = require('./config/env');
const logger = require('./utils/logger.util');

process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', error);
  process.exit(1);
});


const startServer = async () => {
  try {
    
    await connectDB();
    const server = app.listen(port, () => {
      logger.info(`🚀 Server running in ${nodeEnv} mode on port ${port}`);
      logger.info(`API available at http://localhost:${port}`);
      logger.info(`💚 Health check at http://localhost:${port}/health`);
    });

    
    process.on('unhandledRejection', (error) => {
      logger.error('UNHANDLED REJECTION! Shutting down...', error);
      server.close(() => {
        process.exit(1);
      });
    });

    
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Shutting down gracefully...');
      server.close(() => {
        logger.info('Process terminated');
      });
    });

  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};


startServer();