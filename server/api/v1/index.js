'use strict';

var express = require('express');
var suggestions = require('./suggestion/suggestionController');
var lists = require('./list/listController');

var router = express.Router();

// Suggestions
router.post('/suggestions', suggestions.create);
router.get('/suggestions', suggestions.index);
router.get('/suggestions/:id', suggestions.show);
router.put('/suggestions/:id', suggestions.update);
router.delete('/suggestions/:id', suggestions.delete);

// Lists
router.get('/lists', lists.index);
router.get('/lists/:id', lists.show);


module.exports = router;
