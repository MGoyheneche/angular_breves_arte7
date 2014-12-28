'use strict';

var express = require('express');
var suggestions = require('./controllers/suggestionsController');

var router = express.Router();

// Suggestions
router.get('/suggestions', suggestions.index);
router.get('/suggestions/:id', suggestions.show);
router.post('/suggestions', suggestions.create);
router.delete('/suggestions/:id', suggestions.delete);

module.exports = router;
