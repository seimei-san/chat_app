
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("./public"));



const PORT = 5000;

const start = async () => {
  try {
    app.listen(PORT, console.log("App Server is started!"));

  } catch(err) {
    console.log(err);
  }

};



start();

// const server = http.createServer(app);
// server.listen(PORT);

