# La Voie des Ruches (LVDR) – Projet itératif basé sur le vote par consentement

**Interface citoyenne allégée pour faire évoluer collectivement les idées**

Fork simplifié de *DemocracyOS*, sans frameworks lourds, conçu pour être **facile à modifier**, **auto-hébergeable**, et **navigable au tactile**.  
L'interface repose sur un **tableau évolutif** par étapes successives (**Kanban interactif**) avec édition en ligne.

---

## Fonctionnalités

* **Vote par consentement** (inspiré de la sociocratie) : adoption dès qu’il n’y a plus d’objection raisonnable ; les objections déclenchent une itération et des ajustements
* Édition directe en ligne de chaque proposition et de sa timeline
* Suivi d’avancement détaillé par étapes (timeline éditable)
* Déplacement des actions entre étapes, avec couleur et colonne synchronisées
* Responsive et utilisable sur tablette, mobile et iPad (touchscreen optimisé)
* Aucune dépendance à React/Vue : 100 % HTML/CSS/JS
* Utilisation de SortableJS pour un drag & drop fluide
* Icônes RemixIcon intégrées pour une interface claire et légère
* Interface en EJS + Express.js, base de données MongoDB
* Compatible bookmarklets et version PWA
* Import/export des données MongoDB par sauvegarde/restauration (`mongodump` / `mongorestore`)

---

## Fonctionnement du vote par consentement

1. **Clarification** : s’assurer que la proposition est comprise par tous.
2. **Tour de consentement** : chaque participant exprime *consentement*, *préoccupation* ou *objection argumentée*.
3. **Traitement des objections** : une objection raisonnable déclenche une adaptation de la proposition (nouvelle itération).
4. **Adoption** : en l’absence d’objection raisonnable, la proposition est adoptée et passe à l’étape suivante.

> Objectif : favoriser l’amélioration continue et l’alignement suffisant plutôt qu’un vote binaire majorité/minorité.

---

## Stack technique

| Composant       | Technologie          |
| --------------- | -------------------- |
| Backend         | Node.js (Express)    |
| Base de données | MongoDB (via Docker) |
| Templating      | EJS                  |
| Sessions        | express-session      |
| UI / UX         | HTML5, CSS3, JS, SortableJS, RemixIcon |

---

## Lancer le projet en local

1. Démarrer MongoDB via Docker

# Pour utilisateurs macOS avec Colima
    colima start
    docker run --name mongo-lvdr -d -p 27017:27017 mongo:6

2. Cloner et installer les dépendances
    git clone https://codeberg.org/votre-compte/la-voie-des-ruches.git
    cd la-voie-des-ruches
    npm install

3. Configurer l'environnement
    cp .env.example .env
    # (ajuste l’URL Mongo si besoin)

4. Lancer le serveur
    ./start-dev.sh

-> L'application est accessible sur : http://localhost:3000

Tu peux également lancer manuellement avec :
    node app.js

## Scripts utiles
node scripts/cleanup_cartes.js
# Supprimer toutes les cartes invalides (sans _id)

node scripts/verif_ejs.js
# Vérifier la validité syntaxique de tous les fichiers EJS dans ./src/views
# → Parcourt récursivement les sous-dossiers et compile chaque fichier
#   pour détecter les erreurs avant exécution

## Philosophie du projet
    Zéro complexité inutile
    Pas de React/Vue : tout est lisible et modifiable par une commune ou un collectif
    Mobile-first et 100 % navigable au tactile
    Pensé pour une démocratie itérative, plus fluide et collective que le simple vote

## Déploiement recommandé
    VPS ou serveur local
    Reverse proxy via Nginx ou Apache
    Certificats HTTPS via Let's Encrypt
    MongoDB via Docker (ou service cloud)

## Licence
    Code sous licence MIT.
    Inspiré, pour la stack technique, du projet original DemocracyOS.