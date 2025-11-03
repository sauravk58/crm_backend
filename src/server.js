const app = require('./app');
const connectDB = require('./config/database');
const { port, nodeEnv } = require('./config/env');
const logger = require('./utils/logger.util');

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', error);
  process.exit(1);
});

// Connect to database and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    const server = app.listen(port, () => {
      logger.info(`🚀 Server running in ${nodeEnv} mode on port ${port}`);
      logger.info(`📍 API available at http://localhost:${port}`);
      logger.info(`💚 Health check at http://localhost:${port}/health`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (error) => {
      logger.error('UNHANDLED REJECTION! Shutting down...', error);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM
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

// Start the server
startServer();