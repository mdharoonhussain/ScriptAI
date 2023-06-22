const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./backend/config/db");
const PORT = process.env.PORT || 8080;

dotenv.config();
connectDB();


//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan("dev"));


  app.listen(PORT,()=>{
    console.log(`Server is running in ${process.env.DEV_MODE} at ${PORT}`);
  })