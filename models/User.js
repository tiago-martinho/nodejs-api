const mongoose = require("mongoose");
// mongoose.set("debug", true);

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
