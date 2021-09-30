const express = require("express");
const AllUser = require("../controller/User/AllUser");
const DeleteUser = require("../controller/User/DeleteUser");
const SearchUser = require("../controller/User/SearchUser");
const SignUp = require("../controller/User/SignUp");
const UpdateProfile = require("../controller/User/UpdateProfile");
const router = express.Router();

// This is the get all user
router.get("/all", AllUser);

// This is to delete one user
router.get("/delete", DeleteUser);

// This is to get one user
router.get("/search", SearchUser);

// This is to add one user
router.post("/signup", SignUp);

// This is to update one user data
router.post("/update", UpdateProfile);

module.exports = router;
