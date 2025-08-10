const mongoose = require('mongoose');

const propositionSchema = new mongoose.Schema({
  titre: String,
  description: String,
  auteur: String,
  date: Date
});

module.exports = mongoose.model('Proposition', propositionSchema);
