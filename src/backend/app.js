const createError = require("http-errors");
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const fs = require("fs");
const cors = require("cors");


const { sql, poolPromise } = require("./model/dbConfig");

const app = express();

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(cors());

const indexRouter = require("./routes/index");
const customerRouter = require("./routes/customer");
// const usersRouter = require("./routes/users");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
// app.use('/users', usersRouter);
app.use("/customer", customerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.send("Unexpected Error").status(err.status || 500);
});

module.exports = app;
