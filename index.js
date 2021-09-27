const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const userHandler = require('./routeHandlers/userHandler');
require('dotenv').config();
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

  app.use('/user',userHandler);
  app.get('/',(req,res)=>res.send('Api is working'));
  
  app.listen(process.env.PORT || 5000, () => {
    console.log("App runing is 5000 port");
  });





