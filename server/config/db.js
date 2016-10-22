// mongoDB connection settings
const connection = `mongodb://${process.env.dbHost}/${process.env.dbName}`;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const db = mongoose.connect(connection);

module.exports = db;
