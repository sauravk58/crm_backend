const LeadService = require('../services/lead.service');
const ApiResponse = require('../utils/response.util');
const { HTTP_STATUS } = require('../config/constants');

class LeadController {
  
  static async getUnclaimedLeads(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await LeadService.getUnclaimedLeads(page, limit);

      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Unclaimed leads retrieved successfully',
        result
      );
    } catch (error) {
      next(error);
    }
  }

  static async getMyLeads(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await LeadService.getMyLeads(req.employeeId, page, limit);

      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Your claimed leads retrieved successfully',
        result
      );
    } catch (error) {
      next(error);
    }
  }

  static async claimLead(req, res, next) {
    try {
      const { id } = req.params;

      const lead = await LeadService.claimLead(id, req.employeeId);

      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Lead claimed successfully',
        { lead }
      );
    } catch (error) {
      next(error);
    }
  }

  static async getLeadStats(req, res, next) {
    try {
      const stats = await LeadService.getLeadStats(req.employeeId);

      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Lead statistics retrieved successfully',
        { stats }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LeadController;