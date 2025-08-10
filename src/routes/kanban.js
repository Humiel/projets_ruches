const express = require('express');
const router = express.Router();
const authRequired = require('../../middlewares/auth');

router.get('/', authRequired, (req, res) => {
  res.render('kanban', { user: req.session.user });
});

// Récupération dynamique d'une carte depuis MongoDB
router.get('/carte/:id', async (req, res) => {
  const db = req.app.locals.db;
  const cartesCollection = db.collection('cartes');
  const { id } = req.params;

  try {
    const carte = await cartesCollection.findOne({ _id: new require('mongodb').ObjectId(id) });
    if (!carte) return res.status(404).send('Carte introuvable');

    res.render('partials/carte-timeline', { carte });
  } catch (err) {
    console.error('Erreur récupération carte', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
