// Load environment variables from a .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/connection'); // Assuming this imports your database connection configuration
const { userRoute } = require('./routes/user.route');
const { favoriteRoute } = require('./routes/favorite.route');

// Set up the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(express.json()); // Middleware to parse incoming JSON data
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Define a route for the root URL
app.get('/', async (req, res) => {
    try {
        // Send a successful response with a welcome message
        res.status(200).json({
            status: true,
            msg: 'Welcome to the Recipe-Application.'
        });
    } catch (error) {
        console.log(error);
        // Send an error response if something goes wrong
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
});

// Use the user route for handling user-related routes
app.use('/users', userRoute);
// Use the favorite route for handling favorite-recipes-related routes
app.use('/favorites', favoriteRoute);

// Synchronize the database and start the server
connection.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
