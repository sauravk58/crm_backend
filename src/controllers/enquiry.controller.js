const LeadService = require('../services/lead.service');
const ApiResponse = require('../utils/response.util');
const { HTTP_STATUS } = require('../config/constants');

class EnquiryController {
  // Submit enquiry form (Public - No authentication required)
  static async submitEnquiry(req, res, next) {
    try {
      const { name, email, phone, courseInterest, message } = req.body;

      const enquiry = await LeadService.createEnquiry({
        name,
        email,
        phone,
        courseInterest,
        message
        });
        return ApiResponse.success(
            res,
            HTTP_STATUS.CREATED,
            'Enquiry submitted successfully. Our team will contact you soon.',
            { enquiry }
          );
        } catch (error) {
          next(error);
        }
    }
}

module.exports = EnquiryController;