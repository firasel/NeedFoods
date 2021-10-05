const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Reservations = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const DeleteReservation = async (req, res) => {
  try {
    const { reservationId, sellerId } = req.query;

    // Check id is provided or not.
    if (reservationId && sellerId) {
      let deleteReservationData = await Reservations.updateOne(
        { _id: sellerId},
        {
          $pull: {
            reservations: {
              _id: reservationId,
            },
          },
        }
      );

      console.log(deleteReservationData);
      if (deleteReservationData.modifiedCount > 0) {
        res.status(200).send(SendResponse(true, "Reservation data delete success"));
      }else{
        res.status(200).send(SendResponse(false, "Reservation data delete not success"));
      }
    } else {
      res.status(404).send(SendResponse(false, "Reservation data delete not success"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Reservation data delete not success"));
  }
};

module.exports = DeleteReservation;
