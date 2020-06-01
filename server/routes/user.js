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

router.post("/register", (req, res, next) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    user.save(function (err, newUser) {
      if (err) {
        res.status(401).send({ msg: "Invalid User Data" });
      } else {
        res.send({
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          password: newUser.password,
          isAdmin: newUser.isAdmin,
          token: getToken(newUser),
        });
      }
    })
  } catch (err) {
    res.status(401).send({ msg: "Invalid User Data" });
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
