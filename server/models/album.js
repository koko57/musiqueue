const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: String,
  artist: String
});

module.exports = mongoose.model('Album', albumSchema);
