const { JsonDB, Config } = require('node-json-db');

// Create a new database instance
const db = new JsonDB(new Config("logs", true, true, '/'));

module.exports = db;