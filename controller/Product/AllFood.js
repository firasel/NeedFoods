const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const Foods = new mongoose.model("sellers", sellerSchema);
const SendResponse = require("../SendResponse/SendResponse");

const AllFood = async (req, res) => {
  const { sellerId, page = 1, limit = 3 } = req.query;
  let searchQuery = sellerId ? { _id: sellerId } : {};

  const FoodsData = await Foods.find(searchQuery, {
    foods:{ $slice: [(page - 1) * limit, limit] },
    _id: 0,
    seller: 0,
    storeInformation: 0,
    password: 0,
    sellerStatus: 0,
    promoCode: 0,
    review: 0,
    reservations: 0,
  }).limit(1);


  // const FoodsData = await Foods.aggregate([{ $match: { "_id": sellerId } },
  // { $project: { 'foods': { $arrayElemAt: ["$reviews", 0] } } }])
  // console.log(FoodsData);

  // res.status(200).send(SendResponse(true, "Foods Data found",FoodsData));
  if (FoodsData) {
    res.status(200).send(SendResponse(true, "Foods Data found", FoodsData['0']['foods']));
  } else {
    res.status(404).send(SendResponse(false, "Food Data Not Correct"));
  }
};

module.exports = AllFood;
