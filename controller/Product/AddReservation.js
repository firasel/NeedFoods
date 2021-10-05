const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Reservations = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const AddReservation = async (req, res) => {
  const {
    sellerId,
    name,
    img,
    details,
    category,
    price,
    status,
    totalSeat,
    availableSeat,
  } = req.body;

  // Formate the data for insert in mongodb
  const formateData = {
    sellerId,
    name,
    img,
    details,
    category,
    price,
    status,
    totalSeat,
    availableSeat,
  };

  if (sellerId && name && details && category && price && totalSeat && availableSeat) {
    const reservationDataInsert = await Reservations.updateOne(
      { _id: sellerId },
      {
        $push: {
          reservations: {
            $each: [formateData],
          },
        },
      }
    );

    if (reservationDataInsert?.modifiedCount > 0) {
      res
        .status(200)
        .send(SendResponse(true, "Reservation Data inserted Successfull"));
    } else if (reservationDataInsert?.matchedCount === 0) {
      res.status(404).send(SendResponse(false, "Seller Not Found for data insert"));
    } else {
      res.status(404).send(SendResponse(false, "Reservation Data insert Not Success"));
    }
  } else {
    res.status(404).send(SendResponse(false, "Reservation Data Not Correct"));
  }
};

module.exports = AddReservation;
