const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Calendar = require("../../models/Calendar");

// @router    Post api/calendar
// @desc      create a calendar
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("Name", "Name is required").not().isEmpty(),
      check("Day", "Day is required").not().isEmpty(),
      check("Group", "Group is required").not().isEmpty(),
      check("Exam", "Exam is required").not().isEmpty(),
      check("Supervisor", "Supervisor is required").not().isEmpty(),
      check("Salle", "Salle is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Day, Group, Exam, Supervisor, Salle } = req.body;

    try {
      let calendars = await Calendar.findOne({ Name });
      if (calendars) {
        return res
          .status(400)
          .json({ errors: [{ msg: "calendar already exists" }] });
      }
      const newcalendar = new Calendar({
        Name,
        Day,
        Group,
        Exam,
        Supervisor,
        Salle,
      });

      const calendar = await newcalendar.save();

      res.json(calendar);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    Get api/calendar
// @desc     get all calendars
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const calendar = await Calendar.find();
    res.json(calendar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    Get api/calendar/:id
// @desc     get calendar by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params.id);

    if (!calendar) {
      return res.status(404).json({ msg: "calendar not found" });
    }
    res.json(calendar);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "calendar not found" });
    }
    res.status(500).send("server error");
  }
});

// Day

// @route     PUT api/profile/experience
// @desc      add profile experience
// @ access   Private
router.put(
  "/day",
  [auth, [check("Date", "Date is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { Date } = req.body;

    const newDay = {
      Date,
    };

    try {
      const calendar = await Calendar.findOne({ admin: req.admin.id });
      calendar.Day.push(newDay);
      await calendar.save();
      res.json(calendar);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     delete api/profile/experience/:exp_id
// @desc      delete experience from profile
// @ access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const exam = await Calendar.findById(req.params.id);
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

// Session

// @route     PUT api/profile/experience
// @desc      add profile experience
// @ access   Private
router.put(
  "/session",
  [
    auth,
    [
      check("Day", "Day is required").not().isEmpty(),
      check("Matiere", "Matiere is required").not().isEmpty(),
      check("Prof", "Prof is required").not().isEmpty(),
      check("Salle", "Salle is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { Day, Matiere, Prof, Salle } = req.body;

    const newSession = {
      Day,
      Matiere,
      Prof,
      Salle,
    };

    try {
      const calendar = await Calendar.findOne({ admin: req.admin.id });
      calendar.Session.push(newSession);
      await calendar.save();
      res.json(calendar);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route     delete api/profile/experience/:exp_id
// @desc      delete experience from profile
// @ access   Private
router.delete("/session/:session_id", auth, async (req, res) => {
  try {
    const calendar = await Calendar.findOne({ admin: req.admin.id });

    // Get remove index
    const removeIndex = calendar.Session.map((item) => item.id).indexOf(
      req.params.session_id
    );

    calendar.Session.splice(removeIndex, 1);

    await calendar.save();

    res.json(calendar);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
module.exports = router;
