const { Favorite } = require("../models/favorite.model"); // Import the Favorite model
const { Op } = require('sequelize'); // Import Sequelize's operator

// Controller function to add a favorite recipe
async function addingFavorite(req, res) {
    try {
        const id = req.params.id;

        // Create a new favorite record in the database
        const favorite = await Favorite.create({
            recipeID: Number(id),
            userId: req.userId, // The user ID is added from the authentication middleware
        });

        // Return the created favorite record
        return res.status(201).json({
            status: true,
            data: favorite,
            msg: 'Favorite recipe added successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
        });
    }
}

// Controller function to get favorite recipes
async function gettingFavorite(req, res) {
    try {
        const { id, title,recipeID } = req.query;
        const userId = req.userId; // The user ID is added from the authentication middleware

        if (id) {
            const favorite = await Favorite.findOne({ where: { id, userId } });

            if (!favorite) {
                return res.status(404).json({
                    status: false,
                    msg: 'Favorite recipe not found',
                });
            }

            return res.status(200).json({
                status: true,
                data: favorite,
            });
        }

        if (recipeID) {
            const favorite = await Favorite.findOne({ where: { recipeID, userId } });

            if (!favorite) {
                return res.status(404).json({
                    status: false,
                    msg: 'Favorite recipe not found',
                });
            }

            return res.status(200).json({
                status: true,
                data: favorite,
            });
        }

        if (title) {
            const favoriteRecipes = await Favorite.findAll({
                where: {
                    userId,
                    title: {
                        [Op.iLike]: `%${title}%`,
                    },
                },
            });

            return res.status(200).json({
                status: true,
                data: favoriteRecipes,
            });
        }

        // Get all favorite recipes for the user
        const favoriteRecipes = await Favorite.findAll({ where: { userId } });

        return res.status(200).json({
            status: true,
            data: favoriteRecipes,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
        });
    }
}

// Controller function to delete a favorite recipe
async function deletingFavorite(req, res) {
    try {
        const id = req.params.id;

        // Find the favorite recipe by its id
        const favorite = await Favorite.findOne({ where: { id } });

        if (!favorite) {
            return res.status(404).json({
                status: false,
                msg: 'Favorite recipe not found',
            });
        }

        // Delete the favorite recipe
        await favorite.destroy();

        return res.status(200).json({
            status: true,
            msg: 'Favorite recipe deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
        });
    }
}

module.exports = { addingFavorite, gettingFavorite, deletingFavorite };
