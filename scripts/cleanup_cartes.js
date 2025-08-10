// scripts/purge_exemples.js
const mongoose = require('mongoose');
const Carte = require('../src/models/Carte');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/citizen_fork');
    const result = await Carte.deleteMany({ contenu: "Exemple de carte" }); // ou "Exemple de cartes"
    console.log(`🗑️ ${result.deletedCount} carte(s) supprimée(s).`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err);
    process.exit(1);
  }
})();
