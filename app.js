require("dotenv/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes (must come after express.json and urlencoded)
const usersRoute = require("./routes/users");
app.use("/users", usersRoute);

// Connnect to DB

mongoose.connect(
  process.env.CLUSTER_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to BD");
  }
);

// Listen to the server

app.listen(process.env.PORT);
