/**
 * The MongoDB URL to be used throughout the application.
 * @type {string}
 */
const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

module.exports = mongoDbUrl;