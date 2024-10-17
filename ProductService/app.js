require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:4200', // Your Angular app URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
    credentials: true, // Enable credentials if needed
  }));

  
// Middleware to parse JSON
app.use(express.json());

// Test database connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the database successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });

// CRUD operations

// 1. Get all products
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// 2. Get a single product by ID
// Get a product by ID or title
app.get('/api/products/:identifier', async (req, res) => {
  let { identifier } = req.params;

  // Trim whitespace
  identifier = identifier.trim();
  console.log(`Fetching product with identifier: "${identifier}"`); // Log the identifier

  let query, queryParams;

  // Check if the identifier is a number (ID) or a string (title)
  if (!isNaN(identifier)) {
      // If it is a number, treat it as an ID
      query = 'SELECT * FROM products WHERE id = ?';
      queryParams = [identifier];
  } else {
      // Otherwise, treat it as a title
      query = 'SELECT * FROM products WHERE title = ?';
      queryParams = [identifier];
  }

  try {
      console.log(`Executing query: ${query} with params: ${queryParams}`); // Log the query and params
      const [rows] = await pool.query(query, queryParams);
      console.log(`Query result: ${JSON.stringify(rows)}`); // Log the result

      if (rows.length === 0) {
          return res.status(404).send('Product not found');
      }
      res.json(rows[0]); // Return the first matching product
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});
// 3. Create a new product
app.post('/api/products', async (req, res) => {
  const { title, img, price, quantity } = req.body;
  try {
      const [result] = await pool.query('INSERT INTO products (title, img, price, quantity) VALUES (?, ?, ?, ?)', [title, img, price, quantity]);
      res.status(201).json({ id: result.insertId, title, img, price, quantity });
  } catch (err) {
      console.error('Database error:', err); // Log the error to the console
      res.status(500).send('Server error');
  }
});


// 4. Update a product by ID
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { title, img, price, quantity } = req.body;
    try {
        const [result] = await pool.query('UPDATE products SET title = ?, img = ?, price = ?, quantity = ? WHERE id = ?', [title, img, price, quantity, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Product not found');
        }
        res.json({ id, title, img, price, quantity });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// 5. Delete a product by ID
app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(204).send(); // No content
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
