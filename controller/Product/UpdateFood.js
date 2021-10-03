const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const UpdateFood = async (req, res) => {
  const {
    sellerId,
    foodId,
    name,
    img,
    details,
    category,
    price,
    status,
    dineIn,
    reservation,
    foodPickUp,
    foodDelivery,
  } = req.body;

  const foodDataUpdate = await Foods.updateOne(
    { _id: sellerId, "foods._id": foodId },
    {
      $set: {
        "foods.$.name": name,
        "foods.$.img": img,
        "foods.$.details": details,
        "foods.$.category": category,
        "foods.$.price": price,
        "foods.$.status": status,
        "foods.$.dineIn": dineIn,
        "foods.$.reservation": reservation,
        "foods.$.foodPickUp": foodPickUp,
        "foods.$.foodDelivery": foodDelivery,
      },
    }
  );

  if (foodDataUpdate.modifiedCount > 0) {
    res.status(200).send(SendResponse(true, "Food Data Updated Successfull"));
  } else if (foodDataUpdate.matchedCount === 0) {
    res.status(404).send(SendResponse(false, "Seller Foods Not Found"));
  } else {
    res.status(404).send(SendResponse(false, "Food Data Update Not Success"));
  }
};

module.exports = UpdateFood;
