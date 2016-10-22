// mongoDB connection settings
const connection = `mongodb://${process.env.dbHost}/${process.env.dbName}`;
const mongoose = require('mongoose');
mongoose.connect(connection);
var db = mongoose.connection;

var Users = require('../models/users');
var Books = require('../models/books');

db.on('error', function(err){ console.log('db err:', err) });
db.once('open', function() {
  console.log('mongo connection open');

  // mongoose.connection.db.dropCollection('users', function(err, result) {
  //   if (err) console.log(err);
  //   else console.log(result);
  // })
  // mongoose.connection.db.dropCollection('books', function(err, result) {
  //   if (err) console.log(err);
  //   else console.log(result);
  // })
  // mongoose.connection.db.dropCollection('authors', function(err, result) {
  //   if (err) console.log(err);
  //   else console.log(result);
  // })

});


module.exports = db;
