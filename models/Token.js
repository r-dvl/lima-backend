const mongoose = require('mongoose');

/**
 * MongoDB Token Schema
 */
const tokenSchema = new mongoose.Schema({
    username: String,
    token: String,
});

module.exports = mongoose.model('Token', tokenSchema);