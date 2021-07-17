// Required Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Initiate express server
const app = express();

// Environment variables config to use '.env' file
require("dotenv").config();

// Set Static Folder To React Build Folder If App is in Production
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "client", "build")));
}

// CORS Middleware
app.use(cors());

// Parse Body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Store mongouri to connect to
const db =
   process.env.NODE_ENV === "production"
      ? process.env.PRODUCTION_DB
      : process.env.NODE_ENV === "testing"
      ? process.env.TEST_DB
      : process.env.DEV_DB;

// Connect to Database
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: process.env.NODE_ENV !== "testing",
   })
   .then(() => {})
   .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
   res.send("Hello There! :)");
});

// Serve React App if in production
if (process.env.NODE_ENV) {
   app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
   });
}

// Variable For Port to be hosted on
const port = process.env.PORT;

if (process.env.NODE_ENV !== "testing") {
   app.listen(port, () => {
      console.log("🚀 Server running on port: " + port);
   });
}

module.exports = app;
