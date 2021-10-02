const express = require("express");
const Login = require("../controller/User/Login");
const AllUser = require("../controller/User/AllUser");
const DeleteUser = require("../controller/User/DeleteUser");
const SearchUser = require("../controller/User/SearchUser");
const SignUp = require("../controller/User/SignUp");
const UpdateProfile = require("../controller/User/UpdateProfile");
const LoginGuard = require("../middleware/LogInGuard");
const router = express.Router();

// This is the get all user
router.get("/all", AllUser);

// This is to delete one user
router.get("/delete", DeleteUser);

// This is to get one user
router.get("/search", SearchUser);

// This is to add one user
router.post("/signup", SignUp);

// This is to login a user
router.post("/login", Login);

// This is to update one user data
router.post("/update", UpdateProfile);

// Test jwt token
router.get("/test", LoginGuard, (req, res) => {
  res.send(true);
});

module.exports = router;
