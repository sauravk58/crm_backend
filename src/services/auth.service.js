const Employee = require('../models/Employee.model');
const JWTService = require('./jwt.service');
const AppError = require('../utils/error.util');
const { HTTP_STATUS } = require('../config/constants');

class AuthService {
  
  static async register(employeeData) {
    const { name, email, password } = employeeData;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      throw new AppError('Employee with this email already exists', HTTP_STATUS.CONFLICT);
    }

    const employee = await Employee.create({
      name,
      email,
      password
    });

    const token = JWTService.generateToken({
      id: employee._id,
      email: employee.email
    });

    return {
      employee,
      token
    };
  }

  static async login(loginData) {
    const { email, password } = loginData;

    const employee = await Employee.findOne({ email }).select('+password');
    
    if (!employee) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    const isPasswordValid = await employee.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    const token = JWTService.generateToken({
      id: employee._id,
      email: employee.email
    });

    employee.password = undefined;

    return {
      employee,
      token
    };
  }

  static async verifyEmployee(employeeId) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new AppError('Employee not found', HTTP_STATUS.NOT_FOUND);
    }
    return employee;
  }
}

module.exports = AuthService;