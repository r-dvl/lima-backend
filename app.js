const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const photoRoutes = require('./routes/photos');

const app = express();

// MongoDB
// Connection
mongoose.connect('mongodb://192.168.1.55:27017/cat-watcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JSON Handler
app.use(bodyParser.json());

// API Routes
app.use('/photos', photoRoutes);

module.exports = app;
