// users.js
const bcrypt = require('bcrypt');

const users = [
  {
    id: 1,
    username: 'admin',
    passwordHash: '$2b$12$jq4.DdFD7.hKrXUFE1KfSOzdLc/yy38MJXe75fKPVDOFtDj0otwye'
  }
];

function findUser(username) {
  return users.find(u => u.username === username);
}

module.exports = { findUser };


