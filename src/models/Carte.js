const mongoose = require('mongoose');

const CarteSchema = new mongoose.Schema({
  contenu: { type: String, required: true },
  colonne: { type: String, required: true }, // ex : "À soumettre"
  ordre: { type: Number, default: 0 }, // position dans la colonne
  date_creation: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carte', CarteSchema);
