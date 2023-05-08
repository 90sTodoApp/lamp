const express = require('express');
const router = express.Router();
//const { Todo } = require('../models/todos');
//const Sequelize = require('../db')
const db = require('../db');

const passport = require('passport');
const LocalStrategy = require('passport-local');
// can use crypto or bycrpt: crypto is just built in
const crypto = require('crypto');


router.use(express.json())
router.use(express.urlencoded({
  extended: true
  }))    
// added for establishing sessions
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});  
//
passport.use(new LocalStrategy(function verify(username, password, cb) {
  db.get('SELECT * FROM users WHERE username = ?', [ username ], function(err, row) {
    if (err) { return cb(err); }
    if (!row) { return cb(null, false, { message: 'Incorrect username or password.' }); }

    crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, row);
    });
  });
}));

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  // added log out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
// 

//GET TODOS (READ)
// router.get('/', async (req, res, next) => {
//   //const todos = await Todo.findAll()
//   res.render('home.ejs')
// })

// added sign up
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
//

// added signup route
router.post('/signup', function(req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
      req.body.username,
      hashedPassword,
      salt
    ], function(err) {
      if (err) { return next(err); }
      var user = {
        id: this.lastID,
        username: req.body.username
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });
  });
});
//

module.exports = router