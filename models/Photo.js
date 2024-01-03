// Import necessary modules
const mongoose = require('mongoose');

/**
 * MongoDB Photo Schema.
 * @typedef {Object} Photo
 * @property {Date} date - The date associated with the photo.
 * @property {string} image - The image data as a string.
 */
const photoSchema = new mongoose.Schema({
    date: Date,
    image: String,
});

// TODO: Check this constant
const Photo = mongoose.model('Photo', photoSchema);

// Export the Photo model
module.exports = Photo;