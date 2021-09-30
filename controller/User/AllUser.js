const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const AllUser = async (req, res) => {
  try {
    // get all user from database
    const user = await Users.find({},{password:0});
    const allUserData = [];
    // filter the data for remove password
    user?.map((data) =>
      allUserData.push({
        id: data._id,
        ...data.customer,
        userStatus: data.userStatus,
      })
    );

    // check data available or not
    if (allUserData.length > 0) {
      res
        .status(200)
        .send(SendResponse(true, "All User Data Found", allUserData));
    } else {
      res.status(404).send(SendResponse(false, "User Not Found"));
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = AllUser;