const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true
  },

  name: {
      type: String,
      required: true
  },

  gender: String,

  birthDate: Date,

  address: String,

  password: String
})

module.exports.User = mongoose.model("User", UserSchema);