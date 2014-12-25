var express = require('express'),
    path    = require('path'),
    mcapi   = require('mailchimp-api'),
    app     = express(),
    router  = express.Router();


app.use(express.static(path.join(__dirname, '..', '.tmp')));
app.use('/bower_components', express.static(path.join(__dirname, '..', 'client', 'bower_components')));

var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY);


router.get('/lists', function (req, res) {
  mc.lists.list({}, function(data) {
    res.send(data);
  });
});

router.get('/lists/:id', function (req, res) {
  mc.lists.list({filters:{list_id: req.params.id}}, function(listData) {
    if (listData.total === 1)
      res.send(listData.data[0]);

    // mc.lists.members({id: req.params.id}, function(data) {
    //   res.send(data.data);
    // }, function (error) {
    //   console.log(error);
    //   if (error.name == "List_DoesNotExist") {
    //     req.session.error_flash = "The list does not exist";
    //   } else if (error.error) {
    //     req.session.error_flash = error.code + ": " + error.error;
    //   } else {
    //     req.session.error_flash = "An unknown error occurred";
    //   }
    //   // res.redirect('/lists');
    // });
  });
});

router.get('/today_movies', function (req, res) {
  res.sendFile(path.join(__dirname, 'youtube_movies.json'));
});


app.use('/api/v1', router);


app.get('/', function (req, res){
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



var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
