// src/routes/api/kanban.js
const express = require('express');
const router = express.Router();
const Carte = require('../../models/Carte');

// … (GET list, GET détail, POST création) …

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
      update.decisionDeadline = decisionDeadline ? new Date(decisionDeadline) : null;
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
