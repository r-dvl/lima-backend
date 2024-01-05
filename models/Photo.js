// Import necessary modules
import mongoose from 'mongoose';

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

// Export the Photo model
export default mongoose.model('Photo', photoSchema);