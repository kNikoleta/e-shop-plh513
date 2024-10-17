// config/database.js

const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
    host: 'localhost',
    dialect: 'mysql'
});

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('MySQL connected'))
    .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
