const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// 🧠 Définir le basePath dynamique selon l'environnement
const basePath = process.env.BASE_PATH || '';
const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();

  // 🧠 Disponible dans les templates EJS
  app.locals.basePath = basePath;

  // 📦 Middleware
  app.use(expressLayouts);
  app.set('layout', 'layout');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 📁 Dossier public servi au bon chemin
  app.use(basePath, express.static(path.join(__dirname, 'public')));

  // 🧩 Connexion MongoDB Mongoose (optionnelle)
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/citizen_fork');

  // 🧩 Connexion MongoDB native pour app.locals.db
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/citizen_fork');
  await client.connect();
  app.locals.db = client.db();

  // // 🔐 Sessions
  // app.use(session({
  //   secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
  //   resave: false,
  //   saveUninitialized: false,
  //   cookie: { secure: false } // pas de HTTPS ici
  // }));

  // Sessions PROD / local ?
  const FileStore = require('session-file-store')(session); // tout en haut
  const isDev = process.env.NODE_ENV !== 'production';

  // 🔐 Sessions avec persistance en dev, volatile sinon
  app.use(session({
    store: isDev ? new FileStore({ path: './.sessions', ttl: 3600 }) : undefined,
    secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,               // uniquement false si HTTP
      maxAge: 24 * 60 * 60 * 1000  // 1 jour
    }
  }));

  // 🎨 Vues EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'src', 'views'));

  // 🛣️ Routes (toutes montées sur le basePath)
  const authRoutes = require('./src/routes/auth');
  const kanbanRoutes = require('./src/routes/kanban');
  const kanbanApi = require('./src/routes/api/kanban');
  const indexRouter = require('./src/routes/index');
  const propositionRoutes = require('./src/routes/propositions');
  const ideesRoutes = require('./src/routes/idees');

  app.use(basePath + '/', authRoutes);
  app.use(basePath + '/', kanbanRoutes);
  app.use(basePath + '/api/kanban', kanbanApi);
  app.use(basePath + '/', indexRouter);
  app.use(basePath + '/', propositionRoutes);
  app.use(basePath + '/', ideesRoutes);
  const carteRoutes = require('./src/routes/kanban');
  app.use(basePath + '/', carteRoutes);


  // Servir directement la page de login depuis /lvdr
  app.get(basePath, (req, res) => {
    res.render('login', {
      title: 'Connexion',
      error: null,
      user: null
    });
  });

  app.get(basePath + '/', (req, res) => {
    res.render('login', {
      title: 'Connexion',
      error: null,
      user: null
    });
  });

  // 🚀 Démarrage
  app.listen(PORT, () => {
    console.log(`🌐 LVDR lancé sur http://localhost:${PORT}${basePath}`);
  });
}

start().catch(err => {
  console.error('❌ Erreur au démarrage :', err);
});
