const express = require("express");
const AddFood = require("../controller/Product/AddFood");
const AllFood = require("../controller/Product/AllFood");
const DeleteFood = require("../controller/Product/DeleteFood");
const SearchFood = require("../controller/Product/SearchFood");
const UpdateFood = require("../controller/Product/UpdateFood");
const SendResponse = require("../controller/SendResponse/SendResponse");
const router = express.Router();

router.get("/", (req,res)=>res.send(SendResponse(true,"product api is working")));

// This is the add a single food
router.post("/addfood", AddFood);

// This is the update a single food
router.post("/updatefood", UpdateFood);

// This is the search foods
router.get("/searchfood", SearchFood);

// This is the get all foods
router.get("/food", AllFood);

// This is the delete one food
router.get("/deletefood", DeleteFood);

module.exports = router;