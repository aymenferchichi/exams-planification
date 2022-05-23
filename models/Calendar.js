const mongoose = require("mongoose");

const CalendarSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Day: {
    type: Date,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
  Exam: {
    type: String,
    required: true,
  },
  Supervisor: {
    type: String,
    required: true,
  },
  Salle: {
    type: String,
    required: true,
  },
});

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
