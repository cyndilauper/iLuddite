var creds = require('./mongo');
// mongoDB connection settings
const connection = `mongodb://${creds.dbHost}/${creds.dbName}`;
// const connection = 'mongodb://localhost:27017/iLuddite';
const mongoose = require('mongoose');
mongoose.connect(connection);
var db = mongoose.connection;

var Users = require('../models/users');
var Books = require('../models/books');

var fakeBookData = [
  {
    title: 'me',
    author: 'you',
    isbn: 1111,
    authorInfo: 'author info',
    summary: 'summary',
    // coverPhoto: { data: Buffer, contentType: String }
  },
  {
    title: 'him',
    author: 'her',
    isbn: 2222,
    authorInfo: 'author info',
    summary: 'summary',
    // coverPhoto: { data: Buffer, contentType: String }
  },
  {
    title: 'us',
    author: 'them',
    isbn: 3333,
    authorInfo: 'author info',
    summary: 'summary',
    // coverPhoto: { data: Buffer, contentType: String }
  },
  {
    title: 'new',
    author: 'old',
    isbn: 4444,
    authorInfo: 'author info',
    summary: 'summary',
    // coverPhoto: { data: Buffer, contentType: String }
  }
]

var fakeUserData = [
  {
    username: 'alice',
    password: 'password',
    // userPhoto: { data: Buffer, contentType: String },
    // queue: [Book],
    // favorites: [Book],
    // friends: [User]
  },
  {
    username: 'bob',
    password: 'password',
    // userPhoto: { data: Buffer, contentType: String },
    // queue: [Book],
    // favorites: [Book],
    // friends: [User]
  },
  {
    username: 'carl',
    password: 'password',
    // userPhoto: { data: Buffer, contentType: String },
    // queue: [Book],
    // favorites: [Book],
    // friends: [User]
  },
  {
    username: 'diana',
    password: 'password',
    // userPhoto: { data: Buffer, contentType: String },
    // queue: [Book],
    // favorites: [Book],
    // friends: [User]
  }
]

db.on('error', function(err){ console.log('db err:', err) });
db.once('open', function() {
  console.log('mongo connection open');

  mongoose.connection.db.dropCollection('users', function(err, result) {
    if (err) throw err;
    else console.log(result);
  })
  mongoose.connection.db.dropCollection('books', function(err, result) {
    if (err) throw err;
    else console.log(result);
  })
  Books.create(fakeBookData, function(err, books) {
    if (err) console.log('book data insert err:', err);
    console.log('books created:', books);
  })

  Users.create(fakeUserData, function(err, users) {
    if (err) console.log('user data insert err:', err);
    console.log('users created:', users);
  })
});


module.exports = db;
