var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuggestionSchema   = new Schema({
  title: String,
  description: String
});

module.exports = mongoose.model('Suggestion', SuggestionSchema);
