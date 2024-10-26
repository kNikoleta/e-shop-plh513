const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Order = sequelize.define('Order', {
    products: {
        type: DataTypes.JSON, 
        allowNull: false
    },
    total_price: {
        type: DataTypes.FLOAT, 
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Success', 'Reject'),
        defaultValue: 'Pending'
    }
}, {
    timestamps: true 
});

Order.sync();
module.exports = Order;
