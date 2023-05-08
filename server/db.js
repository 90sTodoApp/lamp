const path = require ('path')
const sqlite3 = require('sqlite3');
const mkdirp = require('mkdirp');
const crypto = require('crypto');

mkdirp.sync('./var/db');
// const Sequelize = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: path.join(__dirname, 'db.sqlite'),
//     logging: false
// });

mkdirp.sync('./var/db');

const db = new sqlite3.Database('./var/db/lamp.db');

db.serialize(function() {
  // create the database schema for the todos app
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT, \
    email TEXT UNIQUE, \
    email_verified INTEGER \
  )");
  
  db.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )");
  
  db.run("CREATE TABLE IF NOT EXISTS todos ( \
    id INTEGER PRIMARY KEY, \
    owner_id INTEGER NOT NULL, \
    title TEXT NOT NULL, \
    completed INTEGER \
  )");

  var salt = crypto.randomBytes(16);
  db.run('INSERT OR IGNORE INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
    'lampy',
    crypto.pbkdf2Sync('letmein', salt, 310000, 32, 'sha256'),
    salt
  ]);
});

module.exports = db;

// module.exports = {
//     sequelize
// };
