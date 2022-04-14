const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const ClassRoom = require("../../models/ClassRoom");

// @router    Post api/classroom
// @desc      create a classroom
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("number", "Number is required").not().isEmpty(),
      check("Nbr_places", "Places number is required").not().isEmpty(),
      check("available", "Availability is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { number, Nbr_places, available } = req.body;

    try {
      let Classroom = await ClassRoom.findOne({ number });
      if (Classroom) {
        return res
          .status(400)
          .json({ errors: [{ msg: "classroom already exists" }] });
      }
      const newClassRoom = new ClassRoom({
        number,
        Nbr_places,
        available,
      });

      const classroom = await newClassRoom.save();

      res.json(classroom);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    Get api/classroom
// @desc     get all classrooms
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const classrooms = await ClassRoom.find().sort({ number: +1 });
    res.json(classrooms);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    Get api/classroom/:id
// @desc     get classroom by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const classroom = await ClassRoom.findById(req.params.id);

    if (!classroom) {
      return res.status(404).json({ msg: "classroom not found" });
    }
    res.json(classroom);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "classroom not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    DELETE api/classroom/:id
// @desc     delete a classroom
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const classroom = await ClassRoom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ msg: "classroom not found" });
    }
    await classroom.remove();
    res.json({ msg: "classroom removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "classroom not found" });
    }
  }
});

// @route    PUT api/classroom/:id
// @desc     Udate a classroom
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const { number, Nbr_places, available } = req.body;
  try {
    const classroom = await ClassRoom.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!classroom) {
      return res.status(404).json({ msg: "classroom not found" });
    }
    const newClassRoom = new ClassRoom({
      number,
      Nbr_places,
      available,
    });
    await classroom.save();
    res.json(newClassRoom);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "classroom not found" });
    }
  }
});

module.exports = router;
