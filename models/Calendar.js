const mongoose = require("mongoose");

const CalendarSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Day: {
    type: String,
  },
  Session: {
    type: String,
  },
});

module.exports = Calendar = mongoose.model("calendar", CalendarSchema);
