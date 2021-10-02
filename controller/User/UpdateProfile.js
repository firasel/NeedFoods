const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Users = new mongoose.model("users", userSchema);

const UpdateProfile = async (req, res) => {
  try {
    const { id, name, email, phoneNumber, address } = req.body;

    let usedEmail;
    let usedPhoneNumber;

    // Check Email is alreadyUsed or not
    email
      ? (usedEmail = await Users.findOne(
          { "customer.email": email },
          { _id: 1 }
        ))
      : undefined;
    // Check phone number is alreadyUsed or not
    phoneNumber
      ? (usedPhoneNumber = await Users.findOne(
          { "customer.phoneNumber": phoneNumber },
          { _id: 1 }
        ))
      : undefined;

    if (usedEmail) {
      res.status(404).send(SendResponse(false, "Email is already used"));
    } else if (usedPhoneNumber) {
      res.status(404).send(SendResponse(false, "PhoneNumber is already used"));
    } else {
      // update user data in mongodb
      const dataInsert = await Users.updateOne(
        { _id: id },
        {
          $set: {
            "customer.name": name,
            "customer.email": email,
            "customer.phoneNumber": phoneNumber,
            "customer.address": address,
          },
        }
      );
      // check data is updated or not
      if (dataInsert.modifiedCount > 0) {
        res.status(200).send(SendResponse(true, "Data Updated Successfull"));
      } else if (dataInsert.matchedCount === 0) {
        res.status(404).send(SendResponse(false, "User Not Found"));
      } else {
        res
          .status(404)
          .send(SendResponse(false, "User Data Update Not Success"));
      }
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = UpdateProfile;
