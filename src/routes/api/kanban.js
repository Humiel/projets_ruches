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
      intro,
      description,
      etapes,
      colonne,
      decisionOpen,
      decisionDeadline,
      decisionStatut
    } = req.body;

    const update = {};
    if (typeof titre !== 'undefined') { update.titre = titre; update.contenu = titre; }
    if (typeof intro !== 'undefined') update.intro = intro;
    if (typeof description !== 'undefined') update.description = description;
    if (typeof etapes !== 'undefined') update.etapes = etapes;
    if (typeof colonne !== 'undefined') update.colonne = colonne;

    if (typeof decisionOpen !== 'undefined') update.decisionOpen = !!decisionOpen;
    if (typeof decisionDeadline !== 'undefined') {
      if (decisionDeadline) {
        const d = new Date(decisionDeadline);
        if (isNaN(d.getTime())) return res.status(400).json({ error: 'Format de date invalide pour decisionDeadline' });
        update.decisionDeadline = d;
      } else {
        update.decisionDeadline = null;
      }
    }
    if (typeof decisionStatut !== 'undefined') update.decisionStatut = decisionStatut || null;

    // ✅ on utilise $set et on renvoie la carte même si aucune modif effective
    const carte = await Carte.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!carte) return res.status(404).json({ error: 'Carte non trouvée' });
    res.json(carte);
  } catch (e) {
    console.error('❌ PUT /api/kanban/carte/:id', e);
    res.status(500).json({ error: e.message });
  }
});



// Commentaires sur une proposition
router.get('/carte/:id/commentaires', async (req, res) => {
  try {
    const carte = await Carte.findById(req.params.id, { positions: 1 }).lean();
    if (!carte) return res.status(404).json({ error: 'Carte introuvable' });

    // Normalize fields the frontend expects
    const out = (carte.positions || []).map(p => ({
      userId: p.userId,
      userName: p.userName || p.userId,   // if you have names, include them
      position: p.position,               // 'accord' | 'reserve' | 'objection'
      comment: p.comment || '',          // see schema change below
      at: p.at
    })).sort((a, b) => new Date(a.at) - new Date(b.at));

    res.json(out);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST une position/vote sur une carte
router.post('/carte/:id/position', async (req, res) => {
  try {
    let { position, comment, userId, userName } = req.body;
    const allowed = ['accord', 'reserve', 'objection'];
    if (!allowed.includes(position)) {
      return res.status(400).json({ error: 'position invalide' });
    }
    comment = (typeof comment === 'string') ? comment.trim() : '';

    console.log('[POST /position]', {
      id: req.params.id, position, commentLen: comment.length
    });

    const toPush = {
      position,
      comment,
      userId: userId || null,
      userName: userName || null,
      at: new Date()
    };

    const carte = await Carte.findByIdAndUpdate(
      req.params.id,
      { $push: { positions: toPush } },
      { new: true, runValidators: true }
    ).lean();

    if (!carte) return res.status(404).json({ error: 'Carte non trouvée' });
    res.json(carte.positions || []);
  } catch (e) {
    console.error('❌ POST /api/kanban/carte/:id/position', e);
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titre, contenu, colonne, intro, description } = req.body;
    if (!titre || !colonne) {
      return res.status(400).json({ error: 'Titre ou colonne manquant' });
    }
    const carte = await Carte.create({
      titre,
      contenu: contenu || titre,
      intro: intro || '',
      description: description || '',
      colonne
    });
    res.status(201).json(carte);
  } catch (err) {
    console.error('❌ Erreur POST /api/kanban', err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
