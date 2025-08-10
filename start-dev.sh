#!/bin/bash

# Forçage explicite du MONGODB_URI en localhost
export MONGODB_URI="mongodb://127.0.0.1:27017/citizen_fork"

echo "🌐 Lancement avec Mongo URI : $MONGODB_URI"

# Démarrage du serveur
npm run dev
