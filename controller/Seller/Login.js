const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Sellers = new mongoose.model("sellers", sellerSchema);
const bcrypt = require("bcrypt");
const SendResponse = require("../SendResponse/SendResponse");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sellerData = await Sellers.findOne(
      { "seller.email": email },
      { password: 1, seller: 1, sellerStatus:1 }
    );
    if (sellerData && sellerData.sellerStatus) {
      bcrypt.compare(password, sellerData.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: sellerData.seller.email },
            process.env.JWT_SECRET,
            { expiresIn: "7 days" }
          );
          res
            .status(200)
            .send(
              SendResponse(true, "Login Successful", [
                { token, sellerInformation: sellerData.seller },
              ])
            );
        } else {
          res.status(401).send(SendResponse(false, "Authentication failed"));
        }
      });
    } else {
      res.status(401).send(SendResponse(false, "Authentication failed"));
    }
  } catch (err) {
    res.status(500).send(SendResponse(false, "Internal Server Error"));
  }
};

module.exports = Login;
