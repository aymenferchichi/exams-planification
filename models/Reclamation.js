const mongoose = require("mongoose");

const ReclamationSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Name_Supervisor: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Reason: {
    type: String,
  },
  Response: {
    type: String,
  },
});

module.exports = Reclamation = mongoose.model("reclamation", ReclamationSchema);
