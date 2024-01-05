// Import necessary modules
import mongoose from 'mongoose';

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
export default mongoose.model('User', userSchema);