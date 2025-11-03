const { param, query } = require('express-validator');

const claimLeadValidator = [
  param('id')
    .notEmpty()
    .withMessage('Lead ID is required')
    .isMongoId()
    .withMessage('Invalid lead ID format')
];

const paginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt()
];

module.exports = {
  claimLeadValidator,
  paginationValidator
};