// mongoDB connection settings
// const connection = `mongodb://${process.env.dbHost}/${process.env.dbName}`;
const connection = 'mongodb://localhost:27017/iLuddite';
const mongoose = require('mongoose');
mongoose.connect(connection);
var db = mongoose.connection;

var User = require('../models/users');
var Book = require('../models/books');

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
});

module.exports = db;
