
/* DEPENDENCIES */
var cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var auth = require('./config/auth.js');
var passport = require('passport')
var session = require('express-session')
var winston=require('winston');
require('winston-logstash');
expressWinston = require('express-winston');

// var logger = new (winston.Logger)({
//   transports: [
       // new (winston.transports.Logstash)({
       //     port: 10514,
       //     host: 'logstash',
       //     max_connect_retries: -1,
       //     node_name: 'nodejs',
       // })
//   ]
// });

var indexRouter = require('./routes/index');
var app = express();
app.listen(4000);
// view engine setup
app.use(session({
  // store: new FileStore(),
  secret: 'keyboard mouse',
  resave: false,
  saveUninitialized: false
}));

app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Logstash)({
        port: 10514,
        host: 'logstash',
        max_connect_retries: -1,
        node_name: 'nodejs',
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response
  dynamicMeta: function(req, res) { return [Object]; }
}));

app.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.Logstash)({
        port: 10514,
        host: 'logstash',
        max_connect_retries: -1,
        node_name: 'nodejs',
    })
  ]
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(function(req, res, next) {
//   // res.header("Access-Control-Allow-Origin", "*");
//   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Auth-Token X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use((req, res, next) => {req.user = req.session.user; next()})
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

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
