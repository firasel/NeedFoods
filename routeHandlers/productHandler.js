const express = require("express");
const AddFood = require("../controller/Product/AddFood");
const AddReservation = require("../controller/Product/AddReservation");
const AllFood = require("../controller/Product/AllFood");
const DeleteFood = require("../controller/Product/DeleteFood");
const SearchFood = require("../controller/Product/SearchFood");
const DeleteAddOns = require("../controller/Product/DeleteAddOns");
const UpdateFood = require("../controller/Product/UpdateFood");
const UpdateReservation = require("../controller/Product/UpdateReservation");
const SendResponse = require("../controller/SendResponse/SendResponse");
const SearchReservation = require("../controller/Product/SearchReservation");
const DeleteReservation = require("../controller/Product/DeleteReservation");
const AllReservation = require("../controller/Product/AllReservation");
const router = express.Router();

router.get("/", (req, res) =>
  res.send(SendResponse(true, "product api is working"))
);

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

// This is the add one reservation
router.post("/addreservation", AddReservation);

// This is the add one reservation
router.post("/updatereservation", UpdateReservation);

// This is the search reservation
router.get("/searchreservation", SearchReservation);

// This is the delete reservation
router.get("/deletereservation", DeleteReservation);

// This is the get all reservation data
router.get("/reservation", AllReservation);

// This is the add one reservation
router.post("/deleteaddons", DeleteAddOns);

module.exports = router;
