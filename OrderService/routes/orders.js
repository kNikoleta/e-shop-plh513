// routes/orders.js

const express = require('express');
const router = express.Router();
const Order = require('../Models/order');

// Create a new order
router.post('/', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body); // Create new order
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll(); // Fetch all orders
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get orders by username (you may need to modify your Order model to relate it to users)
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    try {
        // Assuming a User model exists and the order has a user_id reference
        const orders = await Order.findAll({ where: { user_id: username } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
