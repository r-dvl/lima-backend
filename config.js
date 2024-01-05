/**
 * The MongoDB URL to be used throughout the application.
 * @type {string}
 */
const mongoDbUrl = process.env.MONGODB_URL || 'mongodb://192.168.1.33:27017';

export default mongoDbUrl;