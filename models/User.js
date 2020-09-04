const mongoose = require("mongoose");
// mongoose.set("debug", true);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 255,
    min: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
