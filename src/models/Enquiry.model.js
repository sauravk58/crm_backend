const mongoose = require('mongoose');
const { ENQUIRY_STATUS } = require('../config/constants');

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9]{10}$/, 'Please provide a valid 10-digit phone number']
    },
    courseInterest: {
      type: String,
      required: [true, 'Course interest is required'],
      trim: true
    },
    message: {
      type: String,
      trim: true,
      default: ''
    },
    status: {
      type: String,
      enum: Object.values(ENQUIRY_STATUS),
      default: ENQUIRY_STATUS.UNCLAIMED
    },
    claimedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      default: null
    },
    claimedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Index for better query performance
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ claimedBy: 1, status: 1 });

module.exports = mongoose.model('Enquiry', enquirySchema);