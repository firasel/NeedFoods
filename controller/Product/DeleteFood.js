const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const DeleteFood = async (req, res) => {
  try {
    const { foodId, sellerId } = req.query;

    // check which query is available id or email
    if (foodId && sellerId) {
      const foodDataDelte = await Foods.updateOne(
        { _id: sellerId},
        {
          $pull: {
            foods: {
              _id: foodId,
            },
          },
        }
      );

      if (foodDataDelte.modifiedCount > 0) {
        res
          .status(200)
          .send(
            SendResponse(true, "Food Data Delete Successfull")
          );
      } else if (foodDataDelte.matchedCount === 0) {
        res
          .status(404)
          .send(
            SendResponse(
              false,
              "Food Data Delete not success, Food is not found"
            )
          );
      } else {
        res
          .status(404)
          .send(SendResponse(false, "Food Data Delete not success"));
      }
    } else {
      res.status(404).send(SendResponse(false, "Food Data Delete not success"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Food Data Delete not success"));
  }
};

module.exports = DeleteFood;
