const express = require('express');
const cors = require('cors');
const connectToMongo = require("./db");

connectToMongo();
const app = express();
const port = 8000;
const url = 'http://localhost/';
app.use(cors());
app.use(express.json());

// Available Routes
app.get('/', (req, res) => {
  res.send('Backend Working');
});

// Auth Routes
// app.use('/api/auth', require('./routes/auth'));

// Start the server
app.listen(port, () => {
  console.log(`TheNumeroAstrologer app is listening on port ${url}${port}`);
});
