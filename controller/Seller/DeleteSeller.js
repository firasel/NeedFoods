const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Sellers = new mongoose.model("sellers", sellerSchema);

const DeleteSeller = async (req, res) => {
  try {
    const { sellerId } = req.query;
    // check which query is available id or email
    const sellerDelete = await Sellers.deleteOne({ _id: sellerId });

    if (sellerDelete.deletedCount > 0) {
      res.status(200).send(SendResponse(true, "Seller Delete Successfull"));
    } else {
      res.status(404).send(SendResponse(false, "Seller Delete not success"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Seller Delete not success"));
  }
};

module.exports = DeleteSeller;
