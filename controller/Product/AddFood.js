const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const AddFood = async (req, res) => {
  const {
    sellerId,
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

  // Formate the data for insert in mongodb
  const formateData = {
    _id: new ObjectID(),
    sellerId,
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
  };
  if (sellerId && name && details && category && price) {
    const foodDataInsert = await Foods.updateOne(
      { _id: sellerId },
      {
        $push: {
          foods: {
            $each: [formateData],
          },
        },
      }
    );
    
    if (foodDataInsert?.modifiedCount > 0) {
      res
        .status(200)
        .send(SendResponse(true, "Food Data inserted Successfull"));
    } else if (foodDataInsert?.matchedCount === 0) {
      res.status(404).send(SendResponse(false, "Seller Not Found"));
    } else {
      res.status(404).send(SendResponse(false, "Food Data insert Not Success"));
    }
  } else {
    res.status(404).send(SendResponse(false, "Food Data Not Correct"));
  }
};

module.exports = AddFood;
