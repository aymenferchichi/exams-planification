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
  [auth, [check("Name", "Name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Day, Session } = req.body;

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
        Session,
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

// @route    Post api/calendar/:id
// @desc     Post calendar by id
// @access   Private
router.post("/", auth, (req, res) => {
    try {
        
    } catch (err) {
        console.error(err.message);
        
    }
});
module.exports = router;
