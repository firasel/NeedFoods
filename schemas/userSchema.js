const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password: {
    type: String,
    required: [true,"Please Provide Password"],
  },
  userStatus: {
    type: Boolean,
    default: true,
  },
  customer: {
    name: {
      type: String,
      required:  [true,"Please Provide Name"],
    },
    email: {
      type: String,
      required:  [true,"Please Provide email"],
    },
    phoneNumber: {
      type: Number,
      required:  [true,"Please Provide number"],
    },
    address: {
      type: String,
      required:  [true,"Please Provide address"],
    },
  },
},{
  versionKey: false
});

module.exports = userSchema;
