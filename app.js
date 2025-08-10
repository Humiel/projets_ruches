// app.js (extraits pertinents)
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const basePath = process.env.BASE_PATH || '';
const PORT = process.env.PORT || 3000;

async function start() {
  const app = express();
  app.locals.basePath = basePath;

  app.use(expressLayouts);
  app.set('layout', 'layout');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(basePath, express.static(path.join(__dirname, 'public')));

  // ✅ Connexion Mongoose
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/citizen_fork');

  // 🔐 Sessions (inchangé)
  const FileStore = require('session-file-store')(session);
  const isDev = process.env.NODE_ENV !== 'production';
  app.use(session({
    store: isDev ? new FileStore({ path: './.sessions', ttl: 3600 }) : undefined,
    secret: process.env.SESSION_SECRET || 'fallback-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
  }));

  // 🎨 EJS
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'src', 'views'));

  // 🛣️ Routes
  const authRoutes = require('./src/routes/auth');
  const kanbanPageRoutes = require('./src/routes/kanban');        // pages
  const kanbanApi = require('./src/routes/api/kanban');           // API JSON
  const indexRouter = require('./src/routes/index');
  const propositionRoutes = require('./src/routes/propositions');
  const ideesRoutes = require('./src/routes/idees');

// 🛣️ Routes

// 1. API JSON **toujours d'abord**
app.use(basePath + '/api/kanban', require('./src/routes/api/kanban'));

// 2. Authentification et pages spécifiques
app.use(basePath + '/', require('./src/routes/auth'));
app.use(basePath + '/', require('./src/routes/kanban'));      // pages Kanban
app.use(basePath + '/', require('./src/routes/index'));
app.use(basePath + '/', require('./src/routes/propositions'));
app.use(basePath + '/', require('./src/routes/idees'));


  // Page de login
  app.get(basePath, (req, res) => res.render('login', { title:'Connexion', error:null, user:null }));
  app.get(basePath + '/', (req, res) => res.render('login', { title:'Connexion', error:null, user:null }));

  app.listen(PORT, () => {
    console.log(`🌐 LVDR lancé sur http://localhost:${PORT}${basePath}`);
  });
}
start().catch(console.error);
