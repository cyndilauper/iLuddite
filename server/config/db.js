// var creds = require('./mongo');
// mongoDB connection settings
const connection = `mongodb://${process.env.dbHost}/${process.env.dbName}`;
// const connection = 'mongodb://localhost:27017/iLuddite';
const mongoose = require('mongoose');
mongoose.connect(connection);
var db = mongoose.connection;

var Users = require('../models/users');
var Books = require('../models/books');

db.on('error', function(err){ console.log('db err:', err) });
db.once('open', function() {
  console.log('mongo connection open');
  //having weird issues with administrative rights on mongodb so added this to drop all collections on restart
  mongoose.connection.db.dropCollection('users', function(err, result) {
    if (err) console.log(err);
    else console.log(result);
  })
  mongoose.connection.db.dropCollection('books', function(err, result) {
    if (err) console.log(err);
    else console.log(result);
  })
  mongoose.connection.db.dropCollection('authors', function(err, result) {
    if (err) console.log(err);
    else console.log(result);
  })
  // Books.create(fakeBookData, function(err, books) {
  //   if (err) console.log('book data insert err:', err);
  //   console.log('books created:', books);
  // })

  // Users.create(fakeUserData, function(err, users) {
  //   if (err) console.log('user data insert err:', err);
  //   console.log('users created:', users);
  // })
});


module.exports = db;
