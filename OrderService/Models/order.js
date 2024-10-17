// models/Order.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // We'll create this file next

const Order = sequelize.define('Order', {
    // Define the model attributes
    products: {
        type: DataTypes.JSON, // Store products as a JSON object
        allowNull: false
    },
    total_price: {
        type: DataTypes.FLOAT, // Store total price
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Success', 'Reject'),
        defaultValue: 'Pending'
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});

// Synchronize model with the database
Order.sync();
module.exports = Order;
