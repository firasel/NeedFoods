const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const SearchUser = async (req, res) => {
  try {
    let user;
    let oneUserData;
    // check which query is available id or email
    if (req.query.id) {
      user = await Users.find({ _id: req.query.id },{password:0});
    } else if (req.query.email) {
      user = await Users.find({ "customer.email": req.query.email });
    }
    oneUserData = {
      id: user[0]?._id,
      ...user[0]?.customer,
      userStatus: user[0]?.userStatus,
    };
    // check user is found or not found
    if (user.length > 0) {
      res.status(200).send(SendResponse(true,'User Data Found',[oneUserData]))
    } else {
      res.status(404).send(SendResponse(false, 'User Data Not Found'));
    }

  } catch (err) {
    res.status(400).send(SendResponse(false,'Bad Request'));
  }
};

module.exports = SearchUser;