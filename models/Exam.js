const mongoose = require("mongoose");

const ExamSchema = mongoose.Schema({
  Exam_code: {
    type: String,
    required: true,
  },
  Name_exam: {
    type: String,
    required: true,
  },
  Duration: {
    type: String,
    required: true,
  },
  Start_time: {
    type: String,
    required: true,
  },
});

module.exports = Exam = mongoose.model("Exam", ExamSchema);
