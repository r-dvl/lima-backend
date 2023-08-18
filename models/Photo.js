const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    date: String,
    image: Buffer,
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;