const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const DeleteUser = async (req, res) => {
  try {
    // check query is available or not
    if (req.query.id) {
      const user = await Users.findOneAndDelete({ _id: req.query.id });
      // check user is deleted or not
      if (user) {
        res.status(200).send(SendResponse(true, "User Deleted Successfully"));
      } else {
        res.status(404).send(SendResponse(false, "User Not Found"));
      }
    } else {
      res.status(400).send(SendResponse(false, "Bad Request"));
    }
  } catch (err) {
    res.status(404).send(SendResponse(false, "User Not Found"));
  }
};

module.exports = DeleteUser;
