const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 2,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 2,
    max: 1024,
  },
  status: {
    type: String,
    enum: ["isSuperAdmin", "isAdmin", "CASHIER"],
  },
  isAdmin: {
    type: Boolean,
    default: false

  },
  isSuperAdmin: {
    type: Boolean,
    default: false

  },
  date: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('User', userSchema);