const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Express init
const app = express();

const corsOptions = {
  origin: 'https://r-dvl.site',
  optionsSuccessStatus: 200,
};

// TODO: Specify hosts
app.use(cors(corsOptions));

// API Routes Init
const photoRoutes = require('./routes/photos');
const authRoutes = require('./routes/auth')

// MongoDB Connection
// mongoose.connect(`${process.env.MONGODB_URL}/lima`, {
mongoose.connect(`mongodb://192.168.1.55:27017/lima`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JSON Handler
app.use(bodyParser.json());

// Data load limits 
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}))

// API Routes
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes);

module.exports = app;
