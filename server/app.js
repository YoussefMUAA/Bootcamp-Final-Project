var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');

const fs = require('fs');

// Configuramos la BD //
require('./config/db');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false, limit:'100mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
}); 

module.exports = app;
