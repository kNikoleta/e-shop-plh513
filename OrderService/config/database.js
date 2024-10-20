//db.js
require('dotenv').config();
const mysql = require('mysql2');


const pool = mysql.createConnection({
    host: process.env.DB_HOST,  // This should resolve to mysql-products
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
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
