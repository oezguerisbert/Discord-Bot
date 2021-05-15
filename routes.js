const express = require("express");
const router = express.Router();

const User = require("./userSchema");
router.post("/", (req, res) => {
  const user = new User({
    CalenderDate: req.body.CalenderDate,
    CalenderTime: req.body.CalenderTime,
    UserID: req.body.UserID,
  });
  user
    .save()
    .then((result) => {
      console.log("working")
    })
    .catch((err) => {
      //res.json({ message: err });
      console.log(err);
    });
  res.json(user);
});
router.get("/accounts", async (req, res) => {
  const users = await User.find({ UserID: req.body.UserID }, (err) => {
    try {
      console.log(`Data is equal to : ${users}`);
    } catch {
      console.log(err);
    }
  });
  res.json(users);
});
module.exports = router;
