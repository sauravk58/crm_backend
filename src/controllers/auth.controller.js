const AuthService = require('../services/auth.service');
const ApiResponse = require('../utils/response.util');
const { HTTP_STATUS } = require('../config/constants');

class AuthController {
  // Register new employee
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const result = await AuthService.register({ name, email, password });

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        'Employee registered successfully',
        {
          employee: result.employee,
          token: result.token
        }
      );
    } catch (error) {
      next(error);
    }
  }

  // Login employee
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const result = await AuthService.login({ email, password });

      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Login successful',
        {
          employee: result.employee,
          token: result.token
        }
      );
    } catch (error) {
      next(error);
    }
  }

  // Get current employee profile
  static async getProfile(req, res, next) {
    try {
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        'Profile retrieved successfully',
        { employee: req.employee }
      );
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;