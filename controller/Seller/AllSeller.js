const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Sellers = new mongoose.model("sellers", sellerSchema);

const AllSeller = async (req, res) => {
  try {
    // check which query is available id or email
    const sellerData = await Sellers.find(
      {},
      { seller: 1, storeInformation: 1, sellerStatus: 1 }
    );

    if (sellerData) {
      res.status(200).send(SendResponse(true, "Seller Data Found", sellerData));
    } else {
      res.status(404).send(SendResponse(false, "Seller Data Not Found"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Seller Data Not Found"));
  }
};

module.exports = AllSeller;
