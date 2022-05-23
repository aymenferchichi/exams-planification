const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Reclamation = require("../../models/Reclamation");

// @router    Post api/reclamation
// @desc      create a reclamation
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("Name", "Name is required").not().isEmpty(),
      check("Description", "Description is required").not().isEmpty(),
      check("Name_Supervisor", "Name Supervisor is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { Name, Description, Name_Supervisor, Reason } = req.body;

    try {
      let Reclamations = await Reclamation.findOne({ Name });
      if (Reclamations) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Reclamation already exists" }] });
      }
      const newReclamation = new Reclamation({
        Name,
        Description,
        Name_Supervisor,
        Reason,
      });

      const reclam = await newReclamation.save();
      res.json(reclam);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

// @route    Get api/reclamation
// @desc     get all reclamations
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const reclamations = await Reclamation.find();
    res.json(reclamations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    Get api/reclamation/:id
// @desc     get reclamation by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);

    if (!reclamation) {
      return res.status(404).json({ msg: "reclamation not found" });
    }
    res.json(reclamation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "reclamation not found" });
    }
    res.status(500).send("server error");
  }
});

// @route    DELETE api/reclamation/:id
// @desc     delete an reclamation

// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const reclamation = await Reclamation.findById(req.params.id);
    if (!reclamation) {
      return res.status(404).json({ msg: "exam not found" });
    }
    await reclamation.remove();
    res.json({ msg: "exam removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "exam not found" });
    }
  }
});

// @route    PUT api/reclamation/:id
// @desc     Udate a reclamation
// @access   Private
router.put("/:id", auth, async (req, res) => {
  const { Name, Description, Name_Supervisor, Reason, Response } = req.body;
  try {
    const reclamation = await Reclamation.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!reclamation) {
      return res.status(404).json({ msg: "Reclamation not found" });
    }
    const newReclamation = new Reclamation({
      Name,
      Description,
      Name_Supervisor,
      Reason,
      Response,
    });
    await reclamation.save();
    res.json(newReclamation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Reclamation not found" });
    }
  }
});

module.exports = router;
