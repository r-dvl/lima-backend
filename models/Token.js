// Import necessary modules
const mongoose = require('mongoose');

/**
 * MongoDB Token Schema.
 * @typedef {Object} Token
 * @property {string} username - The username associated with the token.
 * @property {string} token - The token string.
 */
const tokenSchema = new mongoose.Schema({
    username: String,
    token: String,
});

// Export the Token model
module.exports = mongoose.model('Token', tokenSchema);