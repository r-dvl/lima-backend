const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Express init
const app = express();

// API Routes Init
const photoRoutes = require('./routes/photos');
const scriptRoutes = require('./routes/scripts')

// MongoDB Connection
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JSON Handler
app.use(bodyParser.json());

// API Routes
app.use('/photos', photoRoutes);
app.use('/scripts', scriptRoutes);

module.exports = app;
