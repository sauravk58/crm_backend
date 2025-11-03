const express = require('express');
const router = express.Router();
const LeadController = require('../controllers/lead.controller');
const { claimLeadValidator, paginationValidator } = require('../validators/lead.validator');
const { validate } = require('../middlewares/validation.middleware');
const { authenticate } = require('../middlewares/auth.middleware');

// All lead routes require authentication
router.use(authenticate);

// Get unclaimed leads (public leads visible to all counselors)
router.get('/unclaimed', paginationValidator, validate, LeadController.getUnclaimedLeads);

// Get my claimed leads
router.get('/my-leads', paginationValidator, validate, LeadController.getMyLeads);

// Get lead statistics
router.get('/stats', LeadController.getLeadStats);

// Claim a lead
router.post('/:id/claim', claimLeadValidator, validate, LeadController.claimLead);

module.exports = router;