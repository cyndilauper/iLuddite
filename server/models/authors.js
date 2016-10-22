const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
  name: String,
  photoPath: String,
  titlesBy: [{ type: Schema.Types.ObjectId, ref: 'Books' }]
});

var Authors = mongoose.model('Authors', authorsSchema);
module.exports = Authors;
