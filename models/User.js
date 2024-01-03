// Import necessary modules
const mongoose = require('mongoose');

/**
 * MongoDB User Schema.
 * @typedef {Object} User
 * @property {string} username - The username of the user. It must be unique.
 * @property {string} password - The password of the user.
 */
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

// Export the User model
module.exports = mongoose.model('User', userSchema);