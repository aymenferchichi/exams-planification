const mongoose = require("mongoose");

const ClassRoomSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  Nbr_places: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

module.exports = ClassRoom = mongoose.model("ClassRoom", ClassRoomSchema);
