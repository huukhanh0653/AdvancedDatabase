var createError = require('http-errors');
var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const sql = require("mssql");

var app = express();

// SQL Server configuration
var config = {
  "user": process.env.DB_USER, // Database username
  "password": process.env.MSSQL_SA_PASSWORD, // Database password
  "server": process.env.DB_HOST, // Server IP address
  "database": "master", // Database name
  "options": {
      "encrypt": false, // Enable encryption
      "trustServerCertificate": true,
      "port": 1433, // Server port,
      "enableArithAbort": true
}};

// Connect to SQL Server
sql.connect(config, err => {
  if (err) {
      throw err;
  }
  console.log("Connection Successful!");
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
