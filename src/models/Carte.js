// src/models/Carte.js

const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
  userId: { type: String, default: null }, // <-- n’est pas required tant que l’auth n’est pas branchée :
  userName: { type: String, default: '' },
  comment: { type: String, default: '' },
  position: { type: String, enum: ['accord', 'reserve', 'objection'], required: true },
  at: { type: Date, default: Date.now }
});

const EtapeSchema = new mongoose.Schema({
  colonne: { type: String, default: '' },
  nom: { type: String, default: '' },
  date: { type: String, default: '' },
  description: { type: String, default: '' }
});

const CarteSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  contenu: { type: String, default: '' },
  intro: { type: String, default: '' },        
  description: { type: String, default: '' },
  colonne: { type: String, required: true },
  etapes: { type: [EtapeSchema], default: [] },
  decisionOpen: { type: Boolean, default: false },
  decisionDeadline: { type: Date, default: null },
  positions: { type: [PositionSchema], default: [] }
}, { timestamps: true });


module.exports = mongoose.model('Carte', CarteSchema);
