const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire } = require('../config/env');
const AppError = require('../utils/error.util');

class JWTService {
  
  static generateToken(payload) {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: jwtExpire
    });
  }
  
  static verifyToken(token) {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new AppError('Token has expired', 401);
      }
      if (error.name === 'JsonWebTokenError') {
        throw new AppError('Invalid token', 401);
      }
      throw new AppError('Token verification failed', 401);
    }
  }

  static decodeToken(token) {
    return jwt.decode(token);
  }
}

module.exports = JWTService;