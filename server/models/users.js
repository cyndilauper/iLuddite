const mongoose = require('mongoose');
const Books = require('./books');
// const UserBooks = require('./userBooks');
// const UserFriends = require('./userFriends');
 
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userPhoto: { data: Buffer, contentType: String },

  // queue & favorites are arrays of ids of instances of Books
  // all ids stored must be document _ids from the Books models
  queue: [{ type: Schema.Types.ObjectId, ref: 'Books' }],
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Books' }],

  // friends is an array of instances of Users
  // all ids stored must be document _ids from the Users models
  friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  stats: Number
  
});

var Users = mongoose.model('Users', usersSchema);
module.exports = Users;
