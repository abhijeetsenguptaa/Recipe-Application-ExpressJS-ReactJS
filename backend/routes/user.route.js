// Load environment variables from a .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const {
    registeringUser,
    loggingUser,
    resetPassword,
    editingUser,
    deletingUser,
    fetchingUser
} = require('../controllers/user.controller'); // Import user-related controller functions

// Create an instance of the Express Router
const userRoute = express.Router();

// Define routes and their associated controller functions
userRoute.post('/register', registeringUser); // Route for user registration
userRoute.post('/login', loggingUser); // Route for user login
userRoute.post('/reset-password', resetPassword); // Route for resetting user password
userRoute.patch('/:id', editingUser); // Route for editing user details
userRoute.delete('/:id', deletingUser); // Route for deleting a user
userRoute.get('/', fetchingUser); // Route for fetching user data

// Export the userRoute for use in other parts of the application
module.exports = { userRoute };
