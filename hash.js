// hash.js
const bcrypt = require('bcrypt');

const motDePasse = 'mot_de_passe';
const saltRounds = 12;

bcrypt.hash(motDePasse, saltRounds).then(hash => {
  console.log('Nouveau hash :', hash);
});


// node hash.js