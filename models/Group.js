const mongoose = require("mongoose");

const GroupSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Number_of_students: {
    type: String,
    required: true,
  },
});

module.exports = Group = mongoose.model("group", GroupSchema);
