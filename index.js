const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const userHandler = require("./routeHandlers/userHandler");
const sellerHandler = require("./routeHandlers/sellerHandler");
const productHandler = require("./routeHandlers/productHandler");
const SendResponse = require("./controller/SendResponse/SendResponse");
require("dotenv").config();
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lwdhb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// For User
app.use("/user", userHandler);
// For Seller
app.use("/seller", sellerHandler);
// For Products
app.use("/product", productHandler);

app.get("/", (req, res) => res.send(SendResponse(true, "Api is working")));

app.use((err, req, res, next) => {
  if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).send(SendResponse(false, "Authentication failed"));
  } else {
    res.status(500).send(SendResponse(false, "Internal server error"));
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App runing is 3000 port");
});
