#!/bin/bash

# 📍 Répertoire de base du dump
BACKUP_DIR="./citizen_fork"
DB_NAME="citizen_fork"
MONGO_URI="mongodb://localhost:27017/$DB_NAME"

# Si le vrai dump est dans un sous-dossier (cas standard de mongodump)
SOURCE_DIR="$BACKUP_DIR"
if [ -d "$BACKUP_DIR/$DB_NAME" ]; then
    SOURCE_DIR="$BACKUP_DIR/$DB_NAME"
fi

echo "🧩 Vérification du dossier de dump : $SOURCE_DIR"
if [ ! -d "$SOURCE_DIR" ]; then
    echo "⛔ Le dossier '$SOURCE_DIR' est introuvable. Abandon."
    exit 1
fi

echo "♻️ Suppression des collections existantes et restauration..."
mongorestore --drop --uri="$MONGO_URI" "$SOURCE_DIR"

if [ $? -eq 0 ]; then
    echo "✅ Base '$DB_NAME' restaurée avec succès depuis '$SOURCE_DIR'."
else
    echo "❌ Une erreur est survenue pendant la restauration."
fi
