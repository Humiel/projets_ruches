// src/routes/api/kanban.js
const express = require('express');
const router = express.Router();
const Carte = require('../../models/Carte');

// POST création carte
router.post('/', async (req, res) => {
  try {
    const { titre, contenu, colonne } = req.body;
    if (!titre || !colonne) {
      return res.status(400).json({ error: 'Titre ou colonne manquant' });
    }
    const carte = await Carte.create({
      titre,
      contenu: contenu || titre,
      colonne
    });
    res.status(201).json(carte);
  } catch (err) {
    console.error('❌ Erreur POST /api/kanban', err);
    res.status(500).json({ error: err.message });
  }
});

// LISTE
router.get('/', async (req, res) => {
  try {
    const cartes = await Carte.find().sort({ colonne: 1, ordre: 1 }).lean();
    res.json(cartes);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DÉTAIL JSON
router.get('/carte/:id', async (req, res) => {
  try {
    const carte = await Carte.findById(req.params.id).lean();
    if (!carte) return res.status(404).json({ error: 'Carte introuvable' });
    res.json(carte);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT carte (titre/etapes/colonne + consentement)
router.put('/carte/:id', async (req, res) => {
  try {
    const {
      titre,
      etapes,
      colonne,
      decisionOpen,
      decisionDeadline,
      decisionStatut
    } = req.body;

    const update = {
      ...(titre && { titre, contenu: titre }),
      ...(etapes && { etapes }),
      ...(colonne && { colonne })
    };

    if (typeof decisionOpen !== 'undefined') {
      update.decisionOpen = !!decisionOpen;
    }

    if (typeof decisionDeadline !== 'undefined') {
      if (decisionDeadline) {
        const parsedDate = new Date(decisionDeadline);
        if (!isNaN(parsedDate.getTime())) {
          update.decisionDeadline = parsedDate;
        } else {
          return res.status(400).json({ error: 'Format de date invalide pour decisionDeadline' });
        }
      } else {
        update.decisionDeadline = null;
      }
    }

    if (typeof decisionStatut !== 'undefined') {
      update.decisionStatut = decisionStatut || null;
    }

    const carte = await Carte.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    ).lean();

    if (!carte) return res.status(404).json({ error: 'Carte non trouvée' });
    res.json(carte);
  } catch (e) {
    console.error('❌ PUT /api/kanban/carte/:id', e);
    res.status(400).json({ error: e.message });
  }
});


module.exports = router;
