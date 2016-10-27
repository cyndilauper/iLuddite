const connection = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const db = mongoose.connect(connection);

module.exports = db;
