var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// API
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');
var Books = require('./models/books');

app.post('/post/books', function(req, res) {
  var book = req.body;

  Books.create(book, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.get('/get/books', function(req, res) {
  Books.find(function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  })
});

app.delete('/book/:_id', function(req, res) {
  Books.remove({'_id' : req.params._id}, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

app.put('/book/:_id', function(req, res) {
  var book = req.body;
  var update = {
    '$set' : {
      'title' : book.title,
      'description' : book.description,
      'price' : book.price,
      'image' : book.image
    }
  };
  var options = {new : true};
  Books.findOneAndUpdate({'_id' : req.params._id}, update, options, function(err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});

// End API

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
