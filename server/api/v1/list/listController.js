'use strict';
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY);

exports.index = function (req, res) {
  mc.lists.list({}, function(data) {
    res.send(data);
  });
}

exports.show = function (req, res){
  mc.lists.list({filters:{list_id: req.params.id}}, function(listData) {
    if (listData.total === 1)
      res.send(listData.data[0]);
  });
}
