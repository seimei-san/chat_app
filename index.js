
require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("./public"));

const { initializeApp } = require('firebase-admin/app');
const { getDatabase } = require('firebase/firebase-database');

const firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SEND_ID,
  appId: process.env.APP_ID,
  databaseURL: "https://proj-seimei-3252b-default-rtdb.asia-southeast1.firebasedatabase.app.firebaseio.com"
};
const appFirebase = initializeApp(firebaseConfig);
const database = getDatabase(appFirebase);


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

