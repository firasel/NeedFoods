const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const SearchFood = async (req, res) => {
  try {
    const { foodId, sellerId, name } = req.query;
    let foodData = undefined;
    let foodsData = [];

    // check which query is available id or email
    if (foodId && sellerId) {
      foodData = await Foods.findOne(
        { _id: sellerId, "foods._id": foodId },
        { "foods.$": 1, _id: 0 }
      );
      foodData? foodsData.push(foodData['foods']['0']) : ''
    } else if (name) {
      foodData = await Foods.aggregate([
        { $unwind: "$foods" },
        { $match: { "foods.name": name } },
        { $project: { foods: 1, _id: 0 } },
      ]);

      if(foodData){
        for (data of foodData) {
          foodsData.push(data.foods);
        }
      }
    }

    if (foodsData.length) {
      res.status(200).send(SendResponse(true, "Food Data Found", foodsData));
    } else {
      res.status(404).send(SendResponse(false, "Food Data Not Found"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Food Data Not Found"));
  }
};

module.exports = SearchFood;
