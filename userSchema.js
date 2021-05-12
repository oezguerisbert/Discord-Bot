const mongoose = require('mongoose');

const User = new mongoose.Schema({
    UserID: Number,
    CalenderDate: String,
    CalenderTime: String
})
module.exports = mongoose.model('UserCalender', User)