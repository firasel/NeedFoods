const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Reservation = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const AllReservation = async (req, res) => {
  const { sellerId, page = 1, limit = 10 } = req.query;
  let searchQuery = sellerId ? { _id: sellerId } : {};
  let allReservationData = [];
  
  const reservationData = await Reservation.find(searchQuery, {
    reservations:{ $slice: [(parseInt(page) - 1) * parseInt(limit), parseInt(limit)] },
    _id: 0,
    seller: 0,
    storeInformation: 0,
    password: 0,
    sellerStatus: 0,
    promoCode: 0,
    review: 0,
    foods: 0,
  }).limit(1).then(data=>{
    allReservationData.push(...data['0']['reservations']);
  })

  if (allReservationData.length > 0) {
    res.status(200).send(SendResponse(true, "Reservation Data found", allReservationData));
  } else {
    res.status(404).send(SendResponse(false, "Reservation Data Not Correct"));
  }
};

module.exports = AllReservation;
