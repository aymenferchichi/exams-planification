const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fonction: {
    type: String,
    required: true,
  },
});

module.exports = Admin = mongoose.model("admin", AdminSchema);
