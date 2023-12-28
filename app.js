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
const dockerRoutes = require('./routes/docker')

// MongoDB Connection
mongoose.connect(`${process.env.MONGODB_URL}/lima`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JSON Handler
app.use(bodyParser.json({limit: '50mb'}));

// API Routes
app.use('/photos', photoRoutes);
app.use('/auth', authRoutes);
app.use('/docker', dockerRoutes);

module.exports = app;
