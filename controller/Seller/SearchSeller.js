const mongoose = require("mongoose");
const sellerSchema = require("../../schemas/sellerSchema");
const SendResponse = require("../SendResponse/SendResponse");
const Sellers = new mongoose.model("sellers", sellerSchema);

const SearchSeller = async (req, res) => {
  try {
    let sellerData;
    let oneSellerData;

    // check which query is available id or email
    if (req.query.id) {
      sellerData = await Sellers.findOne({ _id: req.query.id }, { seller: 1 });
    } else if (req.query.email) {
      sellerData = await Sellers.findOne(
        { "seller.email": req.query.email },
        { seller: 1 }
      );
    }
    // Formate the seller data for response
    oneSellerData = {
      id: sellerData._id,
      ...sellerData.seller,
    };

    if (sellerData) {
      res
        .status(200)
        .send(SendResponse(true, "Seller Data Found", [oneSellerData]));
    } else {
      res.status(404).send(SendResponse(false, "Seller Data Not Found"));
    }
  } catch (error) {
    res.status(404).send(SendResponse(false, "Seller Data Not Found"));
  }
};

module.exports = SearchSeller;
