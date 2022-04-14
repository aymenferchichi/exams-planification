const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Admin = require("../../models/Admin");
const Supervisor = require("../../models/Supervisor");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

// @router    Get api/auth
// @desc      Test route
// @access    Public
router.get("/", auth, async (req, res) => {
  let user = {};
  try {
    if (req.admin) {
      user = await Admin.findById(req.admin.id).select("-password");
    } else {
      user = await Supervisor.findById(req.supervisor.id).select("-password");
    }

    res.json({ user: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @router    Get api/auth
// @desc      authenticate admin & get token
// @access    Public
router.post(
  "/admin",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required ").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let admin = await Admin.findOne({ email });
      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
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

// @router    Get api/auth
// @desc      authenticate supervisor & get token
// @access    Public
router.post(
  "/supervisor",
  [
    check("email", "please include a valid email").isEmail(),
    check("password", "password is required ").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let supervisor = await Supervisor.findOne({ email });
      if (!supervisor) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credntials" }] });
      }

      const isMatch = await bcrypt.compare(password, supervisor.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "invalid credentials" }] });
      }

      const payload = {
        supervisor: {
          id: supervisor.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
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
