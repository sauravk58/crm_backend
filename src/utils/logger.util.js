const logger = {
    info: (message) => {
      console.log(`ℹ️  [INFO] ${new Date().toISOString()} - ${message}`);
    },
    error: (message, error) => {
      console.error(`❌ [ERROR] ${new Date().toISOString()} - ${message}`, error);
    },
    warn: (message) => {
      console.warn(`⚠️  [WARN] ${new Date().toISOString()} - ${message}`);
    },
    debug: (message) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`🐛 [DEBUG] ${new Date().toISOString()} - ${message}`);
      }
    }
  };
  
  module.exports = logger;