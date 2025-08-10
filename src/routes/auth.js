// src/routes/auth.js


const express = require('express');
const bcrypt = require('bcrypt');
const { findUser } = require('../../users');
const router = express.Router();

// GET /login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Connexion',
    error: null,
    user: null
  });
});

// POST /login
router.post('/login', async (req, res) => {
  const basePath = req.app.locals.basePath;
  const { username, password } = req.body;
  const user = findUser(username);

  console.log('Tentative de connexion:', username, password);
  console.log('Utilisateur trouvé :', user);

  if (!user) {
    return res.render('login', {
      title: 'Connexion',
      error: 'Identifiants incorrects',
      user: null
    });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  console.log('Correspondance bcrypt ?', match);

  if (!match) {
    return res.render('login', {
      title: 'Connexion',
      error: 'Identifiants incorrects',
      user: null
    });
  }

  req.session.user = { id: user.id, username: user.username };
  res.redirect(basePath + '/');
});

// GET /logout
router.get('/logout', (req, res) => {
  const basePath = req.app.locals.basePath;
  req.session.destroy(() => {
    res.redirect(basePath + '/login');
  });
});

module.exports = router;
