const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const DeleteAddOns = async (req, res) => {
  try {
    const { foodId, sellerId, addOnsId } = req.body;

    // check which query is available id or email
    if (foodId && sellerId) {
      const foodDataDelte = await Foods.aggregate([
        {"$unwind":"$foods"},
        {"$unwind":"$foods.addOns"},
        {
          "$match":{
            "foods":{
              "$elemMatch":{
                "_id":foodId,
                "addOns":{
                  "$elemMatch":{
                    "_id":addOnsId
                  }
                }
              }
            }
          }
        }
      ])

      console.log(foodDataDelte);

      if (foodDataDelte.modifiedCount > 0) {
        res
          .status(200)
          .send(SendResponse(true, "AddOns Data Delete Successfull"));
      } else if (foodDataDelte.matchedCount === 0) {
        res
          .status(404)
          .send(
            SendResponse(
              false,
              "AddOns Data Delete not success, AddOns is not found"
            )
          );
      } else {
        res
          .status(404)
          .send(SendResponse(false, "1 AddOns Data Delete not success"));
      }
    } else {
      res
        .status(404)
        .send(SendResponse(false, "2 AddOns Data Delete not success"));
    }
  } catch (error) {
    res
      .status(404)
      .send(SendResponse(false, "3 AddOns Data Delete not success"));
  }
};

module.exports = DeleteAddOns;
