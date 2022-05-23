const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const Supervisor = require("../../models/Supervisor");

// @router    post api/admin
// @desc      Test route
// @access    Public
router.post(
  "/",
  [
    check("first_name", "first_name is required").not().isEmpty(),
    check("last_name", "last_name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with a minimum of 6 characters"
    ).isLength({ min: 6 }),
    check("charge", "charge is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password, charge } = req.body;

    try {
      let supervisor = await Supervisor.findOne({ email });
      if (supervisor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "supervisor already exists" }] });
      }

      supervisor = new Supervisor({
        first_name,
        last_name,
        email,
        password,
        charge,
      });
      const salt = await bcrypt.genSalt(10);

      supervisor.password = await bcrypt.hash(password, salt);

      await supervisor.save();

      const payload = {
        supervisor: {
          id: supervisor.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
