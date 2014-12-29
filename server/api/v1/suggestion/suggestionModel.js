'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuggestionSchema = new Schema({
  title: String,
  description: String,
  email: String,
  firstname: String,
  lastname: String
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
