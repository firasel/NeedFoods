const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Reservations = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const UpdateReservation = async (req, res) => {
  const {
    sellerId,
    reservationId,
    name,
    img,
    details,
    category,
    price,
    status,
    totalSeat,
    availableSeat,
  } = req.body;

  const reservationDataUpdate = await Reservations.updateOne(
    { _id: sellerId, "reservations._id": reservationId },
    {
      $set: {
        "reservations.$.name": name,
        "reservations.$.img": img,
        "reservations.$.details": details,
        "reservations.$.category": category,
        "reservations.$.price": price,
        "reservations.$.status": status,
        "reservations.$.totalSeat": totalSeat,
        "reservations.$.availableSeat": availableSeat,
      },
    }
  );

  if (reservationDataUpdate.modifiedCount > 0) {
    res.status(200).send(SendResponse(true, "Reservations Data Updated Successfull"));
  } else if (reservationDataUpdate.matchedCount === 0) {
    res.status(404).send(SendResponse(false, "Seller or Reservation Not Found for update reservations data"));
  } else {
    res.status(404).send(SendResponse(false, "Reservations Data Update Not Success"));
  }
};

module.exports = UpdateReservation;
