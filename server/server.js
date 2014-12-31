'use strict';

var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var app = express();
var router = express.Router();

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// app.use(methodOverride('X-HTTP-Method-Override'));

var port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'public')));
  // var db_id = process.env.MONGOLAB_BREVES_ARTE_PLUS_7_ID,
  //     db_pw = process.env.MONGOLAB_BREVES_ARTE_PLUS_7_PW;
  // mongoose.connect('mongodb://' + db_id + ':' + db_pw + '@ds027521.mongolab.com:27521/breves_arte7');
} else {
  app.use(express.static(path.join(__dirname, '..', '.tmp')));
  app.use(express.static(path.join(__dirname, '..', 'client')));
  mongoose.connect('mongodb://localhost/breves_arte7');
}

app.use('/api/v1', require('./api/v1'));

app.get('/*', function (req, res){
  var rootPath = '';
  if (process.env.NODE_ENV === 'production') {
    rootPath = path.join(__dirname, '..', 'dist', 'public')
  } else {
    rootPath = path.join(__dirname, '..', 'client');
  }
  var options = {
    root: rootPath,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'index.html';
  // res.sendFile(fileName, options, function (err) {
  //   if (err) {
  //     console.log(err);
  //     res.status(err.status).end();
  //   }
  //   else {
  //     console.log('Sent:', fileName);
  //   }
  // });
    res.sendFile('index.html', options);
});


var server = app.listen(port, function () {
  var host = server.address().address
  var port = port
  console.log('Example app listening at http://%s:%s', host, port)
})
