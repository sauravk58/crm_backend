# CRM Backend System

A comprehensive Customer Relationship Management (CRM) backend system built with Node.js, Express, and MongoDB.

## Features

- ✅ Employee/Counselor authentication (Register/Login) with JWT
- ✅ Public enquiry form submission (no authentication required)
- ✅ View all unclaimed leads
- ✅ Claim leads (becomes private to counselor)
- ✅ View my claimed leads
- ✅ Lead statistics
- ✅ Pagination support
- ✅ Input validation
- ✅ Error handling
- ✅ Security best practices

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Express-validator
- **Security**: Helmet, bcryptjs
- **Others**: CORS, Morgan (logging)

📁 Project Structure

crm-backend/
├── src/
│   ├── config/
│   │   ├── database.js              # MongoDB connection
│   │   ├── env.js                   # Environment variables
│   │   └── constants.js             # Application constants
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js       # JWT authentication
│   │   ├── validation.middleware.js # Request validation
│   │   └── error.middleware.js      # Error handling
│   │
│   ├── models/
│   │   ├── Employee.model.js        # Employee/Counselor schema
│   │   └── Enquiry.model.js         # Lead/Enquiry schema
│   │
│   ├── controllers/
│   │   ├── auth.controller.js       # Authentication logic
│   │   ├── enquiry.controller.js    # Enquiry form handling
│   │   └── lead.controller.js       # Lead management
│   │
│   ├── services/
│   │   ├── auth.service.js          # Authentication business logic
│   │   ├── jwt.service.js           # JWT token operations
│   │   └── lead.service.js          # Lead business logic
│   │
│   ├── routes/
│   │   ├── auth.routes.js           # Authentication routes
│   │   ├── enquiry.routes.js        # Enquiry routes
│   │   └── lead.routes.js           # Lead routes
│   │
│   ├── validators/
│   │   ├── auth.validator.js        # Auth input validators
│   │   ├── enquiry.validator.js     # Enquiry validators
│   │   └── lead.validator.js        # Lead validators
│   │
│   ├── utils/
│   │   ├── response.util.js         # API response formatter
│   │   ├── error.util.js            # Custom error classes
│   │   └── logger.util.js           # Logging utility
│   │
│   ├── app.js                       # Express application
│   └── server.js                    # Server entry point
│
├── .env                             # Environment variables (create this)
├── .env.example                     # Example environment file
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies
└── README.md                        # This file

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd crm-backend

2. **Install dependencies**
```bash
npm install


3. **Setup environment variables** 
Create a .env file in the root directory:

env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/crm_system

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=*

4. **Run the application** 
Development mode:
```bash
npm run dev
Production mode:

```bash
npm start

The server will start on http://localhost:5000

