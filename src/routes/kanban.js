// src/routes/kanban.js
const express = require('express');
const router = express.Router();
const authRequired = require('../../middlewares/auth'); // chemin confirmé

// Page Kanban (EJS)
router.get('/', authRequired, (req, res) => {
  res.render('kanban', { user: req.session.user });
});

module.exports = router;
