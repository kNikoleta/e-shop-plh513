require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();


app.use(cors({
    origin: 'http://localhost:4200', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  }));

  
app.use(express.json());

pool.getConnection()
    .then(connection => {
        console.log('Connected to the database successfully!');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });



//Get all products
app.get('/products', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//Get a product by ID or title
app.get('/products/:identifier', async (req, res) => {
  let { identifier } = req.params;

  // Trim whitespace
  identifier = identifier.trim();
  console.log(`Fetching product with identifier: "${identifier}"`); 

  let query, queryParams;

  if (!isNaN(identifier)) {
      query = 'SELECT * FROM products WHERE id = ?';
      queryParams = [identifier];
  } else {
      query = 'SELECT * FROM products WHERE title = ?';
      queryParams = [identifier];
  }

  try {
      console.log(`Executing query: ${query} with params: ${queryParams}`); 
      const [rows] = await pool.query(query, queryParams);
      console.log(`Query result: ${JSON.stringify(rows)}`);

      if (rows.length === 0) {
          return res.status(404).send('Product not found');
      }
      res.json(rows[0]); 
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
});

//Create a new product
app.post('/products', async (req, res) => {
  const { title, img, price, quantity } = req.body;
  try {
      const [result] = await pool.query('INSERT INTO products (title, img, price, quantity) VALUES (?, ?, ?, ?)', [title, img, price, quantity]);
      res.status(201).json({ id: result.insertId, title, img, price, quantity });
  } catch (err) {
      console.error('Database error:', err); 
      res.status(500).send('Server error');
  }
});


//Update a product by ID
app.put('/products/:id', async (req, res) => {
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

//Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Product not found');
        }
        res.status(204).send(); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
