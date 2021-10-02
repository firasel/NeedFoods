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
      user = await Users.findOne({ _id: req.query.id }, { password: 0 });
    } else if (req.query.email) {
      user = await Users.findOne(
        { "customer.email": req.query.email },
        { password: 0 }
      );
    }
    oneUserData = {
      id: user?._id,
      ...user?.customer,
      userStatus: user?.userStatus,
    };
    // check user is found or not found
    if (user) {
      res
        .status(200)
        .send(SendResponse(true, "User Data Found", [oneUserData]));
    } else {
      res.status(404).send(SendResponse(false, "User Data Not Found"));
    }
  } catch (err) {
    res.status(404).send(SendResponse(false, "User Data Not Found"));
  }
};

module.exports = SearchUser;
