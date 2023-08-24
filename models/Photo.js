const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    date: Date,
    image: String
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;