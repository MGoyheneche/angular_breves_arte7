var express = require('express'),
    path    = require('path'),
    app     = express();


app.get('/', function (req, res){
  // app.use(express.static('/'));
  // res.send('server is running');

  var options = {
    root: path.join(__dirname, '..', 'client'),
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  // var fileName = req.params.name;
  res.sendFile('index.html', options, function (err) {
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
