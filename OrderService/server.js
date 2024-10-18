require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders');

const app = express();
const pool = require('./config/database');

app.use(cors({
  origin: 'http://localhost:4200', // Your Angular app URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  credentials: true, // Enable credentials if needed
}));


app.use(express.json()); // For parsing application/json



app.use(bodyParser.json());
app.use('/orders', orderRoutes);



const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`Order service running on port ${PORT}`);
});
