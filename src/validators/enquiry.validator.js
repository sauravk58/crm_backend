const { body } = require('express-validator');

const enquiryValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  
  body('courseInterest')
    .trim()
    .notEmpty()
    .withMessage('Course interest is required'),
  
  body('message')
    .optional()
    .trim()
];

module.exports = {
  enquiryValidator
};