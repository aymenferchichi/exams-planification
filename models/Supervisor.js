const mongoose = require("mongoose");

const SupervisorSchema = mongoose.Schema({
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
  charge: {
    type: String,
    required: true,
  },
});

module.exports = Supervisor = mongoose.model("supervisor", SupervisorSchema);
