const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Seller = new mongoose.model("seller", sellerSchema);

const UpdateProfile = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      phoneNumber,
      address,
      profileImg,
      storeName,
      storeLogo,
      storeBanner,
      storeDetails,
      storeLicense,
      storeAddress,
      wifiPassword,
    } = req.body;

    let usedEmail;
    let usedPhoneNumber;
    let usedStoreName;

    // Check Email is alreadyUsed or not
    email
      ? (usedEmail = await Seller.findOne(
          { "seller.email": email },
          { _id: 1 }
        ))
      : undefined;
    // Check phone number is alreadyUsed or not
    phoneNumber
      ? (usedPhoneNumber = await Seller.findOne(
          { "seller.phoneNumber": phoneNumber },
          { _id: 1 }
        ))
      : undefined;

    if (usedEmail) {
      res.status(404).send(SendResponse(false, "Email is already used"));
    } else if (usedPhoneNumber) {
      res.status(404).send(SendResponse(false, "PhoneNumber is already used"));
    } else {
      // update user data in mongodb
      const dataInsert = await Seller.updateOne(
        { _id: id },
        {
          $set: {
            "seller.name": name,
            "seller.email": email,
            "seller.phoneNumber": phoneNumber,
            "seller.address": address,
            "seller.profileImg": profileImg,
            "storeInformation.storeName": storeName,
            "storeInformation.storeLogo": storeLogo,
            "storeInformation.storeBanner": storeBanner,
            "storeInformation.storeDetails": storeDetails,
            "storeInformation.storeLicense": storeLicense,
            "storeInformation.storeAddress": storeAddress,
            "storeInformation.wifiPassword": wifiPassword,
          },
        }
      );

      // check data is updated or not
      if (dataInsert.modifiedCount > 0) {
        res.status(200).send(SendResponse(true, "Data Updated Successfull"));
      } else if (dataInsert.matchedCount === 0) {
        res.status(404).send(SendResponse(false, "Seller Data Not Found"));
      } else {
        res
          .status(404)
          .send(SendResponse(false, "Seller Data Update Not Success"));
      }
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = UpdateProfile;
