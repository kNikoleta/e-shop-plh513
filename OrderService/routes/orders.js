const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { products, total_price } = req.body;
    const status = 'Pending';
    
    // Insert a new order into the orders table
    const [result] = await pool.query(
      'INSERT INTO orders (total_price, status) VALUES (?, ?)',
      [total_price, status]
    );
    const orderId = result.insertId;

    // Insert order items into order_items table
    for (const product of products) {
      await pool.query(
        'INSERT INTO order_items (order_id, title, amount, price) VALUES (?, ?, ?, ?)',
        [orderId, product.title, product.amount, product.price]
      );
    }
    
    res.status(201).json({ message: 'Order created', orderId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
});

// Get all orders including their items
router.get('/', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders');
    
    // Fetch order items for each order
    const [orderItems] = await pool.query('SELECT * FROM order_items');
    
    // Map the order items to their respective orders
    const ordersWithItems = orders.map(order => {
      const items = orderItems.filter(item => item.order_id === order.id);
      return {
        ...order,
        products: items
      };
    });

    res.status(200).json(ordersWithItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});

module.exports = router;
