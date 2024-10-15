const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3306;

app.use(express.json());

const db = mysql.createConnection({
  host: 'mysql-container',  // Use environment variable or default to localhost
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'products_db',
  port: 3306
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// 1. POST /products - Create a new product
app.post('/products', (req, res) => {
  const { title, img, price, quantity } = req.body;
  const query = 'INSERT INTO products (title, img, price, quantity) VALUES (?, ?, ?, ?)';

  db.query(query, [title, img, price, quantity], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ message: 'Product created', productId: result.insertId });
  });
});

// 2. GET /products - Return all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// 3. GET /products/:id - Return a single product by ID
app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'SELECT * FROM products WHERE id = ?';

  db.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(result[0]);
  });
});

// 4. GET /products/title/:title - Return products by title
app.get('/products/title/:title', (req, res) => {
  const title = req.params.title;
  const query = 'SELECT * FROM products WHERE title LIKE ?';

  db.query(query, [`%${title}%`], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

// 5. PUT /products/:id - Update a product by ID
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { title, img, price, quantity } = req.body;
  const query = 'UPDATE products SET title = ?, img = ?, price = ?, quantity = ? WHERE id = ?';

  db.query(query, [title, img, price, quantity, productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated' });
  });
});

// 6. DELETE /products/:id - Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = req.params.id;
  const query = 'DELETE FROM products WHERE id = ?';

  db.query(query, [productId], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
