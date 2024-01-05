// Import necessary modules
import mongoose from 'mongoose';

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
export default mongoose.model('Token', tokenSchema);