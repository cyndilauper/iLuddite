// mongoDB connection settings
// const connection = `mongodb://${process.env.dbHost}/${process.env.dbName}`;
const connection = 'mongodb://localhost:27017/iLuddite';
const mongoose = require('mongoose');
const db = mongoose.connect(connection);

db.on('error', console.error);
db.once('open', function() {
  console.log('mongo connection open');
});

module.exports = db;
