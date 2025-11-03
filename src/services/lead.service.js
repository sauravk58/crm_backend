const Enquiry = require('../models/Enquiry.model');
const { ENQUIRY_STATUS, HTTP_STATUS } = require('../config/constants');
const AppError = require('../utils/error.util');

class LeadService {
  // Create new enquiry (public form submission)
  static async createEnquiry(enquiryData) {
    const enquiry = await Enquiry.create(enquiryData);
    return enquiry;
  }

  // Get all unclaimed leads
  static async getUnclaimedLeads(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Enquiry.find({ status: ENQUIRY_STATUS.UNCLAIMED })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments({ status: ENQUIRY_STATUS.UNCLAIMED })
    ]);

    return {
      leads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalLeads: total,
        leadsPerPage: limit
      }
    };
  }

  // Get leads claimed by specific employee
  static async getMyLeads(employeeId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      Enquiry.find({
        claimedBy: employeeId,
        status: ENQUIRY_STATUS.CLAIMED
      })
        .sort({ claimedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments({
        claimedBy: employeeId,
        status: ENQUIRY_STATUS.CLAIMED
      })
    ]);

    return {
      leads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalLeads: total,
        leadsPerPage: limit
      }
    };
  }

  // Claim a lead
  static async claimLead(leadId, employeeId) {
    // Find the enquiry
    const enquiry = await Enquiry.findById(leadId);

    if (!enquiry) {
      throw new AppError('Lead not found', HTTP_STATUS.NOT_FOUND);
    }

    // Check if lead is already claimed
    if (enquiry.status === ENQUIRY_STATUS.CLAIMED) {
      throw new AppError('Lead has already been claimed', HTTP_STATUS.CONFLICT);
    }

    // Update enquiry to claimed status
    enquiry.status = ENQUIRY_STATUS.CLAIMED;
    enquiry.claimedBy = employeeId;
    enquiry.claimedAt = new Date();

    await enquiry.save();

    return enquiry;
  }

  // Get lead statistics for an employee
  static async getLeadStats(employeeId) {
    const [totalClaimed, unclaimedCount] = await Promise.all([
      Enquiry.countDocuments({
        claimedBy: employeeId,
        status: ENQUIRY_STATUS.CLAIMED
      }),
      Enquiry.countDocuments({ status: ENQUIRY_STATUS.UNCLAIMED })
    ]);

    return {
      myClaimed: totalClaimed,
      availableUnclaimed: unclaimedCount
    };
  }
}

module.exports = LeadService;