const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");              // added for POST data handling
const session = require('express-session');             // added for state
const favicon = require('serve-favicon');               // favicon extra

const indexRouter = require('./routes/index');          // router for basic routing file
const usersRouter = require('./routes/users');          // router concerned with users routing file

const app = express();
app.locals.pretty = app.get('env') === 'development';   // pretty print html

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));// favicon extra

app.use(session({secret: 'aaahhhhh', resave: true, saveUninitialized: true}));  // setup session
app.use(bodyParser.urlencoded({ extended: false }));    // added POST data handling
app.use(bodyParser.json());                             // added POST data handling
app.use('/', indexRouter);                              // urls pointing router index.js
app.use('/users', usersRouter);                         // urls for users.js

if (app.get('env') === 'development') {                 // added pretty prints html while testing
  app.locals.pretty = true;
}

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
  res.render('error');
});

module.exports = app;