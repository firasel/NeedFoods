const mongoose = require("mongoose");
const userSchema = require("../../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");
const SendResponse = require("../SendResponse/SendResponse");

const SignUp = async (req, res) => {
  try {
    const { password, name, email, address, phoneNumber } = req.body;

    // hashing the password for security purpose
    const hashedPassword = await bcrypt.hash(password, 10);
    // check User email is already used or not
    const userDataFind = await Users.findOne(
      { "customer.email": email },
      { _id: 1 }
    );

    if (userDataFind) {
      res.status(409).send(SendResponse(false, "Email is Already Used"));
    } else {
      // data insert in mongodb
      const dataInsert = new Users({
        password: hashedPassword,
        customer: {
          name,
          email,
          phoneNumber,
          address,
        },
      });

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
