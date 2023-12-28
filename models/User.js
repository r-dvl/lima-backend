const mongoose = require('mongoose');

/**
 * MongoDB User Schema
 */
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

module.exports = mongoose.model('User', userSchema);