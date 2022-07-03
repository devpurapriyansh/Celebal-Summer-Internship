const mongoose = require("mongoose");

const Student = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  contactNumber: {
    type: Number,
    required: true,
  },

  specialization: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("student", Student, "Student");
