#!/bin/bash

# 📅 Date du jour
DATE=$(date +%Y-%m-%d_%H-%M)

# 📂 Répertoire de travail
BACKUP_ROOT="/var/www/lvdr"
DUMP_DIR="$BACKUP_ROOT/backup_mongo"
ARCHIVE="$BACKUP_ROOT/backup_mongo_$DATE.tar.gz"

# 🗂️ Nom de la base
DB_NAME="citizen_fork"
MONGO_URI="mongodb://localhost:27017/$DB_NAME"

echo "📦 Sauvegarde de la base MongoDB '$DB_NAME' en cours..."

# 🧹 Suppression de l'ancien dump si présent
if [ -d "$DUMP_DIR" ]; then
    echo "♻️ Suppression de l'ancienne sauvegarde..."
    rm -rf "$DUMP_DIR"
fi

# 🔁 Dump de la base
mongodump --uri="$MONGO_URI" --out="$DUMP_DIR"

if [ $? -ne 0 ]; then
    echo "❌ Erreur pendant mongodump. Abandon."
    exit 1
fi

# 📦 Archive du dossier
echo "📦 Compression de la sauvegarde dans $ARCHIVE..."
tar -czf "$ARCHIVE" -C "$BACKUP_ROOT" backup_mongo

# (optionnel) Nettoyage du dossier temporaire
rm -rf "$DUMP_DIR"

echo "✅ Sauvegarde terminée : $ARCHIVE"
