import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";

const router = express.Router();

router.post("/signin", async (req, res, next) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (signinUser) {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      password: signinUser.password,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser)
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

router.post("/register", async (req, res, next) => {
  try {
    let user = await User.findOne({
      email: req.body.email
    });
    
    if (user) {
      return res.status(400).json({
        msg: "User Already Exists"
      });
    }

    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

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
});

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
