const { DataTypes } = require('sequelize');
const { connection } = require('../configs/connection');
const { User } = require('./user.model'); // Import the User model

const Favorite = connection.define('favorites', {
    recipeID : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
});

// Define associations between User and Favorite models
User.hasMany(Favorite, { foreignKey: 'userId' }); // One-to-Many relationship
Favorite.belongsTo(User, { foreignKey: 'userId' }); // Many-to-One relationship

module.exports = { Favorite };
