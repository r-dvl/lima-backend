const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express init
const app = express();

// API Routes Init
const photoRoutes = require('./routes/photos');
const scriptRoutes = require('./routes/scripts');
const authRoutes = require('./routes/auth')

// MongoDB Connection
mongoose.connect(`${process.env.MONGODB_URL}/lima`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JSON Handler
app.use(bodyParser.json());

// API Routes
app.use('/photos', photoRoutes);
app.use('/scripts', scriptRoutes);
app.use('/auth', authRoutes);

module.exports = app;
