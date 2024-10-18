//db.js
require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createConnection({
    host: process.env.DB_HOST || 'mysql-orders',  // This should be 'mysql-orders' to match the Docker service name
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'orders_db',
    port: 3307 // MySQL default port inside the container
  });

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Export the pool for use in other files
module.exports = pool.promise(); // Use promise-based API for better async handling
