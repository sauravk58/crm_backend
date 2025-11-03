const JWTService = require('../services/jwt.service');
const AuthService = require('../services/auth.service');
const AppError = require('../utils/error.util');
const { HTTP_STATUS } = require('../config/constants');

const authenticate = async (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided. Please authenticate.', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    const decoded = JWTService.verifyToken(token);

    const employee = await AuthService.verifyEmployee(decoded.id);

    req.employee = employee;
    req.employeeId = employee._id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authenticate };