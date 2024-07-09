const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const ApiError = require("../utils/apiError");
const errorHandler = require("./controller/errorController");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404));
});

app.use(errorHandler);

module.exports = app;
