const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

console.log("MONGO_URL:", process.env.MONGO_URL);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("NOT CONNECTED TO NETWORK", err);
  });

// Routes
app.use("/", Routes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
