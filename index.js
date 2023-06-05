require("dotenv").config();
const http = require("http");
const express = require("express");
const appExpress = express();
appExpress.use(express.json());
appExpress.use(express.static("./public"));



const PORT = 5000;

const start = async () => {
  try {
    appExpress.listen(PORT, console.log("App Server is started!"));

  } catch(err) {
    console.log(err);
  }
};


start();
