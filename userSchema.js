const mongoose = require("mongoose");

const User = new mongoose.Schema({
  UserID: {
    type: Number,
    required: true,
  },
  CalenderDate: {
    type: String,
    required: true,
  },
  CalenderTime: {
    type: String,
    required: true,
  },
});
const userSchema = mongoose.model("userCalender", User);

module.exports = userSchema;
