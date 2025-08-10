// src/routes/api/kanban.js
const express = require('express');
const router = express.Router();
const Carte = require('../../models/Carte');
const { ObjectId } = require('mongodb');

// Récupérer toutes les cartes
router.get('/', async (req, res) => {
  const cartes = await Carte.find().sort({ colonne: 1, ordre: 1 });
  res.json(cartes);
});

// Récupérer les timelines

router.get('/carte/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const carte = await db.collection('cartes').findOne({ _id: new ObjectId(id) });
    if (!carte) return res.status(404).json({ error: 'Carte introuvable' });

    res.json(carte);
  } catch (err) {
    console.error('❌ Erreur dans GET /carte/:id', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour TOUTE la carte (titre, auteur, étapes)
router.put('/carte/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const { titre, auteur, etapes } = req.body;

  try {
    const result = await db.collection('cartes').updateOne(
      { _id: new ObjectId(id) },
      { $set: { titre, auteur, etapes } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Carte non modifiée (ou introuvable)' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('❌ Erreur PUT /carte/:id', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});


// Créer une nouvelle carte
router.post('/', async (req, res) => {
  console.log("📥 Reçu via POST /api/kanban :", req.body);

  const { contenu, colonne, titre } = req.body;
  if (!contenu || !colonne) {
    console.warn("❌ Données manquantes :", req.body);
    return res.status(400).json({ error: 'Contenu ou colonne manquant' });
  }

  try {
    const total = await Carte.countDocuments();
    const MAX_CARTES = 500;

    if (total >= MAX_CARTES) {
      console.warn("❌ Limite atteinte :", total);
      return res.status(403).json({ error: `Limite de ${MAX_CARTES} cartes atteinte.` });
    }

  const nouvelleCarte = new Carte({
    titre: titre || contenu,
    contenu,
    colonne,
    ordre: 0
  });

    const saved = await nouvelleCarte.save();
    console.log("✅ Carte enregistrée :", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Mettre à jour contenu / colonne / ordre
router.patch('/:id', async (req, res) => {
  const updated = await Carte.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Supprimer une carte
router.delete('/:id', async (req, res) => {
  await Carte.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;