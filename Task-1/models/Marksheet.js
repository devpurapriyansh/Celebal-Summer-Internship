const mongoose = require("mongoose");

const Marksheet = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },

  mathsMarks: {
    type: Number,
    required: true,
  },

  dsaMarks: {
    type: Number,
    required: true,
  },

  dbmsMarks: {
    type: Number,
    required: true,
  },

  totalMarks: {
    type: Number,
  },
});

module.exports = mongoose.model("Marksheet", Marksheet, "Marksheet");
