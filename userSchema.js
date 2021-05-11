const mongoose = require('mongoose')
const { Schema } from 'mongoose'

const UserSchema = new Schema({
  userID: Number,
  dates: {
    type: Mixed,
    calenderDates = Mixed
  }
})
const User = mongoose.model('userDataCalender', UserSchema);

module.exports = { User }