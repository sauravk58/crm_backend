const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { corsOrigin } = require('./config/env');

// Import routes
const authRoutes = require('./routes/auth.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const leadRoutes = require('./routes/lead.routes');

// Import middlewares
const { errorHandler, notFound } = require('./middlewares/error.middleware');
const ApiResponse = require('./utils/response.util');
const { HTTP_STATUS } = require('./config/constants');

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Health check route
app.get('/health', (req, res) => {
  return ApiResponse.success(res, HTTP_STATUS.OK, 'Server is running', {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/leads', leadRoutes);

// Welcome route
app.get('/', (req, res) => {
  return ApiResponse.success(res, HTTP_STATUS.OK, 'Welcome to CRM API', {
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      enquiry: '/api/enquiry',
      leads: '/api/leads',
      health: '/health'
    }
  });
});

// Handle 404 routes
app.use(notFound);

// Global error handler
app.use(errorHandler);

module.exports = app;