// src/routes/propositions.js
const router = require('express').Router();
const Proposition = require('../models/Proposition');

router.get('/propositions', async (req, res) => {
  try {
    const propositions = await Proposition.find().sort({ date: -1 }).lean();
    res.render('propositions/index', {
      propositions,
      title: 'Liste des propositions'
    });
  } catch (err) {
    res.status(500).send('Erreur serveur : ' + err.message);
  }
});

module.exports = router;
