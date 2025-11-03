const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { corsOrigin } = require('./config/env');

const authRoutes = require('./routes/auth.routes');
const enquiryRoutes = require('./routes/enquiry.routes');
const leadRoutes = require('./routes/lead.routes');

const { errorHandler, notFound } = require('./middlewares/error.middleware');
const ApiResponse = require('./utils/response.util');
const { HTTP_STATUS } = require('./config/constants');

const app = express();

app.use(helmet());

app.use(cors({
  origin: corsOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.get('/health', (req, res) => {
  return ApiResponse.success(res, HTTP_STATUS.OK, 'Server is running', {
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/leads', leadRoutes);

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

app.use(notFound);

app.use(errorHandler);

module.exports = app;