const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Sellers = new mongoose.model("sellers", sellerSchema);
const bcrypt = require("bcrypt");
const SendResponse = require("../SendResponse/SendResponse");

const SignUp = async (req, res) => {
  try {
    const {
      password,
      name,
      email,
      phoneNumber,
      address,
      storeName,
      storeDetails,
      storeLicense,
      storeAddress,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sellerData = {
      password: hashedPassword,
      seller: {
        name,
        email,
        phoneNumber,
        address,
      },
      storeInformation: {
        storeName,
        storeDetails,
        storeLicense,
        storeAddress,
      },
    };
    // check email is already used or not
    const sellerFind = await Sellers.findOne(
      { "seller.email": email },
      { _id: 1 }
    );

    if (sellerFind) {
      res.status(409).send(SendResponse(false, "Email is Already Used"));
    } else {
      const dataInsert = new Sellers(sellerData);
      dataInsert.save((err) => {
        if (err) {
          res.status(400).send(SendResponse(false, "Your data is Wrong"));
        } else {
          res
            .status(200)
            .send(SendResponse(true, "Data inserted successfully"));
        }
      });
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = SignUp;
