const express = require("express");
const Login = require("../controller/Seller/Login");
const SearchSeller = require("../controller/Seller/SearchSeller");
const SignUp = require("../controller/Seller/Signup");
const SendResponse = require("../controller/SendResponse/SendResponse");
const UpdateProfile = require("../controller/Seller/UpdateProfile");
const LoginGuard = require("../middleware/LogInGuard");
const router = express.Router();

router.get("/", (req,res)=>res.send(SendResponse(true,"seller api is working")));

// This is the signup a seller
router.post("/signup", SignUp);

// This is the signin a seller
router.post("/login", Login);

//This is for search one seller data
router.get('/search',SearchSeller);

//This is for search one seller data
router.post('/update',UpdateProfile);

router.get("/test",LoginGuard,(req,res)=>{
    try {
        res.send(true)
    } catch (err) {
        console.log(err);
        res.status(401).send(SendResponse(false, err));
    }
})

module.exports = router;