//functional schema for unimplemented authors feature. titlesBy was envisioned as a list of books by that author.  Retrieving those, whether from an API call or a db query, has yet to be implemented in the authors routes.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorsSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  photoPath: String,
  titlesBy: [{ type: Schema.Types.ObjectId, ref: 'Books' }]
});

const Authors = mongoose.model('Authors', authorsSchema);
module.exports = Authors;
