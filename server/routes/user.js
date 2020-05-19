import express from "express";
import User from "../models/userModel";
const router = express.Router();

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