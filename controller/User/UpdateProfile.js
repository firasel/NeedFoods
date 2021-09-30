const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const UpdateProfile = async (req, res) => {
  try {
    const { id, name, email, phoneNumber, address } = req.body;

    // update user data in mongodb
    const dataInsert = await Users.findOneAndUpdate(
      { _id: id },
          {
              '$set':{
                  'customer.name':name,
                  'customer.email':email,
                  'customer.phoneNumber':phoneNumber,
                  'customer.address':address,
              }
          },
      { new: true }
    );
    // check data is updated or not
    if (dataInsert) {
      res.status(200).send(SendResponse(true, "Data Updated Successfull"));
    } else {
      res.status(404).send(SendResponse(false, "Data Not Found"));
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = UpdateProfile;
