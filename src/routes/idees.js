// src/routes/idees.js
const express = require('express');
const router = express.Router();
const Idee = require('../models/Idee');

// Route liste
router.get('/idees', async (req, res) => {
  try {
    const idees = await Idee.find().sort({ date: -1 }).lean();
    res.render('idees/index', {
      idees,
      title: 'Liste des idées citoyennes'
    });
  } catch (err) {
    res.status(500).send('Erreur serveur : ' + err.message);
  }
});

// Route affichage formulaire
router.get('/idees/nouvelle', (req, res) => {
  res.render('idees/nouvelle', {
    title: 'Nouvelle idée'
  });
});

// Route soumission formulaire
router.post('/idees', async (req, res) => {
  const { titre, description } = req.body;
  try {
    const idee = new Idee({ titre, description });
    await idee.save();
    res.redirect('/idees');
  } catch (err) {
    res.status(500).send('Erreur lors de la création de l’idée.');
  }
});

// ❗ Enfin seulement maintenant :
module.exports = router;
