'use strict';
var path = require('path');


exports.static = function (req, res) {
  res.sendFile(path.join(__dirname, 'youtube_movies.json'));
}

