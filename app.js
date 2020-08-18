const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const holdersRouter = require('./routes/holders');
const verifyToken = require('./middleware/verif-token');

const app = express();

// DB CONNECTION INIT
const db = require('./helpers/db')();

// Config File Require
const config = require('./config');
app.set('api_secret_key', config.api_secret_key)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); //  register
app.use('/', verifyToken); // middleware
app.use('/cards', cardsRouter);
app.use('/holders', holdersRouter);

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
  res.json( {error: {message: err.message, code: err.code } });
});

module.exports = app;
