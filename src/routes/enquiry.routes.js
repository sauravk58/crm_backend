const express = require('express');
const router = express.Router();
const EnquiryController = require('../controllers/enquiry.controller');
const { enquiryValidator } = require('../validators/enquiry.validator');
const { validate } = require('../middlewares/validation.middleware');

// Public route - No authentication required
router.post('/', enquiryValidator, validate, EnquiryController.submitEnquiry);

module.exports = router;