const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Group = require("../../models/Group");

// @router    Post api/group
// @desc      create a group
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("Name", "Name is required").not().isEmpty(),
      check("Number_of_students", "number of students is required")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Number_of_students } = req.body;

    try {
      let groups = await Group.findOne({ Name });
      if (groups) {
        return res
          .status(400)
          .json({ errors: [{ msg: "group already exists" }] });
      }
      const newGroup = new Group({
        Name,
        Number_of_students,
      });

      const group = await newGroup.save();

      res.json(group);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    Get api/group
// @desc     get all groups
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const group = await Group.find();
    res.json(group);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    Get api/group/:id
// @desc     get group by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group) {
      return res.status(404).json({ msg: "group not found" });
    }
    res.json(group);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "group not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    DELETE api/group/:id
// @desc     delete a group
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) {
      return res.status(404).json({ msg: "group not found" });
    }
    await group.remove();
    res.json({ msg: "group removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "group not found" });
    }
  }
});

// @route    PUT api/group/:id
// @desc     Udate a group
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const { Name, Number_of_students } = req.body;
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body);
    if (!group) {
      return res.status(404).json({ msg: "group not found" });
    }
    const newGroup = new Group({
      Name,
      Number_of_students,
    });
    await group.save();
    res.json(newGroup);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "group not found" });
    }
  }
});

module.exports = router;
