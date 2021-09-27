const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const Users = new mongoose.model("users", userSchema);
const bcrypt = require("bcrypt");

// This is the get all user
router.get("/all", async (req, res) => {
  try {
    // get all user from database
    const user = await Users.find();
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
      res.status(200).send(allUserData);
    } else {
      res.status(404).send({ message: "User Not Found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// This is to delete one user
router.get("/delete", async (req, res) => {
  try {
    // check query is available or not
    if (req.query.id) {
      const user = await Users.findOneAndDelete({ _id: req.query.id });
      // check user is deleted or not
      if (user) {
        res.status(200).send({ message: "User Deleted Successfully" });
      }
    } else {
      res.status(400).send({ message: "Bad Request" });
    }
  } catch (err) {
    res.status(404).send({ message: "User Not Found" });
  }
});

// This is to get one user
router.get("/one", async (req, res) => {
  try {
    let user;
    let oneUserData;
    // check which query is available id or email
    if (req.query.id) {
      user = await Users.find({ _id: req.query.id });
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
      res.status(200).send(oneUserData);
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(400).send({ message: "Bad Request" });
  }
});

// This is to add one user
router.post("/signup", async (req, res) => {
  try {
    // hashing the password for security purpose
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // format the user data for insert in mongodb
    const data = {
      password: hashedPassword,
      customer: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      },
    };
    // data insert in mongodb
    const dataInsert = new Users(data);
    dataInsert.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send({ message: "Data inserted successfully" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// This is to update one user data
router.post("/update", async (req, res) => {
  try {
    // format the user data for update in mongodb
    const updateData = {
      userStatus: req.body.userStatus,
      customer: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      },
    };
    // update user data in mongodb
    const dataInsert = await Users.findOneAndUpdate(
      { _id: req.body.id },
      updateData,
      { new: true }
    );
    // check data is updated or not
    if (dataInsert) {
      res.status(200).send({ message: "Data Updated Successfull" });
    } else {
      res.status(404).send({ message: "Data Not Found" });
    }
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
