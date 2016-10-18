//As it turns out, these subdocuments may be unnecessary, commenting out for now

// const mongoose = require('mongoose');
// const UserBooks = require('./userBooks');
// const Users = require('./users');


// const Schema = mongoose.Schema;

// const userFriendsSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   userPhoto: { data: Buffer, contentType: String },
//   // //queue & favorites are arrays of instances of the UserBooks sub-document model
//   queue: [{ type: Schema.Types.ObjectId, ref: 'UserBooks' }],
//   favorites: [{ type: Schema.Types.ObjectId, ref: 'UserBooks' }],
//   // not sure how to handle friends, perhaps like this?
//   friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
// });

// var UserFriends = mongoose.model('UserFriends', userFriendsSchema);
// module.exports = UserFriends;
