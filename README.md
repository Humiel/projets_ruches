# La Voie des Ruches (LVDR) – Projet itératif basé sur le vote par consentement

🗳️ **Interface citoyenne allégée pour faire évoluer collectivement les idées**

Fork simplifié de *DemocracyOS*, sans frameworks lourds, conçu pour être **facile à modifier**, **auto-hébergeable**, et **navigable au tactile**.  
L'interface repose sur un **tableau évolutif** par étapes successives (**Kanban interactif**) avec édition en ligne.

---

## ✨ Fonctionnalités

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

## 🗳️ Fonctionnement du vote par consentement

1. **Clarification** : s’assurer que la proposition est comprise par tous.
2. **Tour de consentement** : chaque participant exprime *consentement*, *préoccupation* ou *objection argumentée*.
3. **Traitement des objections** : une objection raisonnable déclenche une adaptation de la proposition (nouvelle itération).
4. **Adoption** : en l’absence d’objection raisonnable, la proposition est adoptée et passe à l’étape suivante.

> Objectif : favoriser l’amélioration continue et l’alignement suffisant plutôt qu’un vote binaire majorité/minorité.

---

## 🔧 Stack technique

| Composant       | Technologie          |
| --------------- | -------------------- |
| Backend         | Node.js (Express)    |
| Base de données | MongoDB (via Docker) |
| Templating      | EJS                  |
| Sessions        | express-session      |
| UI / UX         | HTML5, CSS3, JS, SortableJS, RemixIcon |

---

## 🚀 Lancer le projet en local

### 1. Démarrer MongoDB via Docker

```bash
# Pour utilisateurs macOS avec Colima
colima start

docker run --name mongo-lvdr -d -p 27017:27017 mongo:6
