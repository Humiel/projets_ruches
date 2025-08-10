# La Voie des Ruches (Projet itératif)

🗳️ **Interface citoyenne allégée pour faire évoluer collectivement les idées**

Fork simplifié de DemocracyOS, sans frameworks lourds, conçu pour être **facile à modifier**, **auto-hébergeable**, et **navigable au tactile**. L'interface repose sur un tableau évolutif par étapes successives.

---

## ✨ Fonctionnalités

* Édition directe en ligne de chaque proposition et de sa timeline
* Suivi d’avancement détaillé par étapes (timeline éditable)
* Déplacement des actions entre étapes, avec couleur et colonne synchronisées
* Responsive et utilisable sur tablette, mobile et iPad (touchscreen optimisé)
* Aucune dépendance à React/Vue : 100 % HTML/CSS/JS
* Utilisation de SortableJS pour un drag & drop fluide
* Icônes RemixIcon intégrées pour une interface claire et légère
* Interface en EJS + Express.js, base de données MongoDB
* Compatible bookmarklets et version PWA
* Import/export des données MongoDB par sauvegarde/restauration (mongodump / mongorestore)

---

## 🔧 Stack technique

| Composant       | Technologie          |
| --------------- | -------------------- |
| Backend         | Node.js (Express)    |
| Base de données | MongoDB (via Docker) |
| Templating      | EJS                  |
| Sessions        | express-session      |

---

## 🚀 Lancer le projet en local

### 1. Démarrer MongoDB via Docker

```bash
# Pour utilisateurs macOS avec Colima
colima start

docker run --name mongo-la-voie-des-ruches -d -p 27017:27017 mongo:6
```

### 2. Cloner et installer les dépendances

```bash
git clone https://codeberg.org/votre-compte/la-voie-des-ruches.git
cd la-voie-des-ruches
npm install
```

### 3. Lancer le serveur

```bash
cp .env.example .env
# (ajuste l’URL Mongo si besoin)
./start-dev.sh
```

👉 L'application est accessible sur : [http://localhost:3000](http://localhost:3000)

---

## 🧼 Scripts utiles

```bash
node scripts/cleanup_cartes.js        # Supprimer toutes les cartes invalides (sans _id)
node scripts/purge_exemples.js        # Supprimer les cartes de démonstration (si présentes)
```

---

## 🧠 Philosophie du projet

* **Zéro complexité inutile**
* **Pas de React/Vue** : tout est lisible et modifiable par une commune ou un collectif
* **Mobile-first** et 100 % navigable au tactile
* Pensé pour une **démocratie itérative**, plus fluide et collective que le simple vote

---

## 📦 Déploiement recommandé

* VPS ou serveur local
* Reverse proxy via Nginx ou Apache
* Certificats HTTPS via Let's Encrypt
* MongoDB via Docker (ou service cloud)

---

## 📄 Licence

Code sous licence MIT.
Inspiré du projet original [DemocracyOS](https://github.com/DemocracyOS/app).
