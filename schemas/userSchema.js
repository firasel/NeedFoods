const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  userStatus: {
    type: Boolean,
    default: true,
  },
  customer: {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: Number,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
  },
});

module.exports = userSchema;
