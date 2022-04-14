const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Exam = require("../../models/Exam");

// @router    Post api/exams
// @desc      create an exam
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("Exam_code", "Exam code is required").not().isEmpty(),
      check("Name_exam", "Name is required").not().isEmpty(),
      check("Duration", "Duration is required").not().isEmpty(),
      check("Start_time", "start time is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Exam_code, Name_exam, Duration, Start_time } = req.body;

    try {
      let Exams = await Exam.findOne({ Exam_code });
      if (Exams) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Exam already exists" }] });
      }
      const newExam = new Exam({
        Exam_code,
        Name_exam,
        Duration,
        Start_time,
      });

      const exam = await newExam.save();
      res.json(exam);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    Get api/exams
// @desc     get all exams
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const exam = await Exam.find();
    res.json(exam);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    Get api/exams/:id
// @desc     get exam by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ msg: "exam not found" });
    }
    res.json(exam);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "exam not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    DELETE api/exams/:id
// @desc     delete an exam

// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ msg: "exam not found" });
    }
    await exam.remove();
    res.json({ msg: "exam removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "exam not found" });
    }
  }
});

// @route    PUT api/group/:id
// @desc     Udate a group
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const { Exam_code, Name_exam, Duration, Start_time } = req.body;
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body);
    if (!exam) {
      return res.status(404).json({ msg: "exam not found" });
    }
    const newExam = new Exam({
      Exam_code,
      Name_exam,
      Duration,
      Start_time,
    });
    await exam.save();
    res.json(newExam);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "exam not found" });
    }
  }
});

module.exports = router;
