const express = require("express");
const router = express.Router();

const User = require("./userSchema");

/*----------------------------------------------------*/
/*---------POST NEW USER CALENDER DATA----------------*/
/*-----------------------------------------------------*/

router.post("/", (req, res) => {
  const user = new User({
    CalenderDate: req.body.CalenderDate,
    CalenderTime: req.body.CalenderTime,
    UserID: req.body.UserID,
  });
  user
    .save()
    .then((result) => {
      res.json(user);
    })
    .catch((err) => {
      //res.json({ message: err });
      console.log(err);
    });
});

/*----------------------------------------------------*/
/*---------------GET USER CALENDER DATA--------------*/
/*--------------------------------------------------*/

router.get("/accounts/", async (req, res) => {
  const users = await User.find(
    { UserID: req.query.UserID ?? req.body.UserID },
    { _id: 0, __v: 0, UserID: 0 },
    () => {
      try {
        console.log("Working");
      } catch (err) {
        console.log(err);
      }
    }
  );
  res.json(users);
});

/*--------------------------------------------------*/
/*---------DELETE USER CALENDER DATA----------------*/
/*--------------------------------------------------*/

router.delete("/accounts/", async (req, res) => {
  User.deleteMany({ UserID: req.body.UserID })
    .then(function () {
      res.json({ message: "Working" });
    })
    .catch(function (error) {
      console.log(error);
    });
});

/*---------------------------------------------------------------------------------------------------------------------------*/

module.exports = router;
