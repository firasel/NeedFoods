const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");
const SendResponse = require("../SendResponse/SendResponse");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await Users.findOne(
      { "customer.email": email },
      { password: 1, customer: 1 , userStatus:1}
    );
    if (userData && userData.userStatus) {
      bcrypt.compare(password, userData.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { email: userData.customer.email },
            process.env.JWT_SECRET,
            { expiresIn: "7 days" }
          );
          res
            .status(200)
            .send(
              SendResponse(true, "Login Successful", [{
                token,
                customerInformation: userData.customer,
              }])
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
