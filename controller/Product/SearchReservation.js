const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Reservations = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const SearchReservation = async (req, res) => {
  try {
    const { reservationId, sellerId, name } = req.query;
    let reservationData = undefined;
    let reservationsData = [];

    // check which query is available id or email
    if (reservationId && sellerId) {
      reservationData = await Reservations.findOne(
        { _id: sellerId, "reservations._id": reservationId },
        { "reservations.$": 1, _id: 0 }
      );
      reservationData? reservationsData.push(reservationData['reservations']['0']) : ''
    } else if (name) {
      reservationData = await Reservations.aggregate([
        { $unwind: "$Reservations" },
        { $match: { "Reservations.name": name } },
        { $project: { Reservations: 1, _id: 0 } },
      ]);

      if(reservationData){
        for (data of reservationData) {
            reservationsData.push(data.reservationData);
        }
      }
    }

    if (reservationsData.length) {
      res.status(200).send(SendResponse(true, "Reservations Data Found", reservationsData));
    } else {
      res.status(404).send(SendResponse(false, "Reservations Data Not Found"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Reservations Data Not Found"));
  }
};

module.exports = SearchReservation;
