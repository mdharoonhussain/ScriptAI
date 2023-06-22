const express = require("express");
const { connection } = require('./db');
const cors = require("cors");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send("Hello World!");
  });

app.listen(process.env.PORT || 5500, async () => {
    try {
      await connection;
  
      console.log("*****************Connected to DB*****************");
    } catch (error) {
      console.log("Error in DB", error);
    }
  });