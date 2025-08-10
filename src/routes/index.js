// src/routes/index.js
const express = require('express');
const router = express.Router();

// Page d’accueil avec le Kanban
router.get('/', (req, res) => {
  res.render('index', { title: 'Kanban citoyen itératif' });
});

module.exports = router;
