const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/crm_system',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};