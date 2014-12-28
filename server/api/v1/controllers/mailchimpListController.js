'use strict';

var Suggestion = require('./../../../models/suggestionModel');

function isValidId (req, res){
  req.checkParams('id', 'Invalid id').isObjectId();

  var errors = req.validationErrors();
  if(!errors){
    return true;
  }
  res.json(400, errors)
  return false;
}

exports.index = function (req, res) {
  Suggestion.find({}, function (err, suggestions) {
    if(err) return res.json(500, err);

    res.json(suggestions);
  });
}

exports.show = function (req, res){

  // if(!isValidId(req, res)) return ;

  Suggestion.findById(req.param('id'), function (err, suggestion){
    if(err) return res.json(500, err);

    res.json(suggestion);
  });
}

exports.create = function (req, res){

  var suggestion = new Suggestion(req.body);

  suggestion.save(function (err){
    if(err) return res.json(400, err);

    res.json(suggestion);
  });
}
