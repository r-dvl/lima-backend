const mongoose = require('mongoose');

/**
 * MongoDB Photo Schema
 */
const photoSchema = new mongoose.Schema({
    date: Date,
    image: String,
    cat: Boolean
});
const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;