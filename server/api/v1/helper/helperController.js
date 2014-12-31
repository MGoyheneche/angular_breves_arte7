'use strict';
var mcapi = require('mailchimp-api');
var mc = new mcapi.Mailchimp(process.env.MAILCHIMP_API_KEY);

exports.listsForEmail = function (req, res) {
  mc.helper.listsForEmail({email: {email: req.params.email}}, function(data) {
    res.send(data);
  }, function(data){
    res.send(data);
  });
};
