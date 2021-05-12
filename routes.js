const express = require("express");
const router = express.Router();

const User = require("./userSchema");

router.post("/", (req, res) => {
  const user = new User({
    CalenderDate: req.body.calenderDate,
    CalenderTime: req.body.calenderTime,
    UserID: req.body.UserID
  });
  user
    .save()
    .then(result => {
    })
    .catch(err => {
      //res.json({ message: err });
      console.log(err);
    });
    res.json(user)
});
router.get('/', (req, res) => {
  const users = User.findAll({ UserID: req.body.UserID }, (err) => {
    try {
      console.log(users)
    }
    catch {
      console.log(err)
    }
  })
})
module.exports = router;