const express = require('express');
const { authentication } = require('../middleware/authentication.middleware'); // Import authentication middleware
const { addingFavorite, gettingFavorite, deletingFavorite } = require('../controllers/favorite.controller'); // Import controller functions

const favoriteRoute = express.Router();

// POST route to add a favorite recipe
favoriteRoute.post('/:id', authentication, addingFavorite);

// GET route to get favorite recipes
favoriteRoute.get('/', authentication, gettingFavorite);

// DELETE route to delete a favorite recipe
favoriteRoute.delete('/:id', authentication, deletingFavorite);

module.exports = { favoriteRoute };
