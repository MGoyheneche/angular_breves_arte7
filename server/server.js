var express = require('express'),
    path    = require('path'),
    app     = express();


app.use(express.static(path.join(__dirname, '..', '.tmp')));
app.use('/bower_components', express.static(path.join(__dirname, '..', 'client', 'bower_components')));


app.get('/', function (req, res){
  // app.use(express.static('/'));
  // res.send('server is running');
  // console.log(path.join(__dirname, '..', '.tmp'));

  var options = {
    root: path.join(__dirname, '..', 'client'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = 'index.html';
  res.sendFile(fileName, options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });

});

app.get('/api', function (req, res) {
  res.send(' API is running');
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
