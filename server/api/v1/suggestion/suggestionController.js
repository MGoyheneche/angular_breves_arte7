'use strict';
var _ = require('lodash');

var Suggestion = require('./suggestionModel');

exports.index = function (req, res) {
  Suggestion.find({}, function (err, suggestions) {
    if (err)
      res.status(500).json(err);

    res.json(suggestions);
  });
};

exports.show = function (req, res) {
  Suggestion.findById(req.params.id, function (err, suggestion) {
    if (err)
      res.status(500).json(err);

    res.json(suggestion);
  });
};

exports.create = function (req, res) {
  var suggestion = new Suggestion(req.body);
  suggestion.save( function (err) {
    if (err)
      res.status(400).json(err);

    res.json(suggestion);
  });
};

exports.update = function (req, res) {
  Suggestion.findById(req.params.id, function(err, suggestion) {
    console.log(suggestion);
    if (err)
      res.send(err);

    suggestion = _.extend(suggestion, req.body)
    suggestion.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Suggestion updated!', suggestion: suggestion });
    });
  });
};

exports.delete = function (req, res) {
  Suggestion.remove({ _id: req.params.id }, function (err, suggestion) {
    if (err)
      res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
};
