const Employee = require('../models/Employee.model');
const JWTService = require('./jwt.service');
const AppError = require('../utils/error.util');
const { HTTP_STATUS } = require('../config/constants');

class AuthService {
  // Register new employee
  static async register(employeeData) {
    const { name, email, password } = employeeData;

    // Check if employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      throw new AppError('Employee with this email already exists', HTTP_STATUS.CONFLICT);
    }

    // Create new employee
    const employee = await Employee.create({
      name,
      email,
      password
    });

    // Generate token
    const token = JWTService.generateToken({
      id: employee._id,
      email: employee.email
    });

    return {
      employee,
      token
    };
  }

  // Login employee
  static async login(loginData) {
    const { email, password } = loginData;

    // Find employee and include password field
    const employee = await Employee.findOne({ email }).select('+password');
    
    if (!employee) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    // Check password
    const isPasswordValid = await employee.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', HTTP_STATUS.UNAUTHORIZED);
    }

    // Generate token
    const token = JWTService.generateToken({
      id: employee._id,
      email: employee.email
    });

    // Remove password from employee object
    employee.password = undefined;

    return {
      employee,
      token
    };
  }

  // Verify employee by ID
  static async verifyEmployee(employeeId) {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      throw new AppError('Employee not found', HTTP_STATUS.NOT_FOUND);
    }
    return employee;
  }
}

module.exports = AuthService;