import express from "express";
import { check, validationResult } from "express-validator/check";
import bcrypt from "bcryptjs";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();

router.post(
  "/signin",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      const signinUser = await User.findOne({
        email: email,
      });

      if (!signinUser)
        return res.status(400).json({
          message: "User Not Exist",
        });

      const isMatch = await bcrypt.compare(password, signinUser.password);

      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !",
        });

      if (signinUser) {
        res.send({
          _id: signinUser._id,
          name: signinUser.name,
          email: signinUser.email,
          password: signinUser.password,
          isAdmin: signinUser.isAdmin,
          token: getToken(signinUser),
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

router.post(
  "/register",
  [
    check("name", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({
        email: email,
      });

      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }

      user = new User({
        name: name,
        email: email,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const newUser = await user.save();

      if (newUser) {
        res.send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.get("/createadmin", async (req, res, next) => {
  try {
    const user = new User({
      name: "Nad",
      email: "basick@mail.com",
      password: "123",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    res.send({ msg: err.message });
  }
});

module.exports = router;
