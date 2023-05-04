const mongoose = require("mongoose");
const DateOnly = require("mongoose-dateonly")(mongoose);

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: DateOnly,
    required: true,
  },
  role: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  qualification: [
    {
      type: String,
      required: true,
    },
  ],
  skills: [
    {
      type: Object,
      required: true,
    },
  ],
  profileImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("User_ReactExam2", userSchema);
