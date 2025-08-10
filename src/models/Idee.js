const mongoose = require('mongoose');

const ideeSchema = new mongoose.Schema({
  titre: String,
  contenu: String,
  date: Date
});

// Spécifie bien le nom de collection ici
module.exports = mongoose.model('Idee', ideeSchema, 'idees');
