'use strict';

var express = require('express');
var suggestions = require('./suggestion/suggestionController');
var lists = require('./list/listController');
var movies = require('./movie/movieController');
var helper = require('./helper/helperController');

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
router.post('/lists/subscribe/', lists.subscribe);

// Movies
router.get('/movies', movies.static);
// router.get('/movies/:date', lists.show); TODO

// Helper
router.get('/helper/lists-for-email/:email', helper.listsForEmail);

module.exports = router;
