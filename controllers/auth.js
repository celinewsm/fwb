var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('auth/index');
});

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      profileImg: "/img/profile-placeholder.png"
    }
  }).spread(function(user, created) {
    console.log("user: ",user)
    console.log("created: ",created)
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
    } else {
      req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    req.flash('error', error.message);
    res.redirect('/auth');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
  // res.render('auth/login',{ alerts: req.flash()});
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  console.log('logged out');
  req.flash('success', 'You have logged out');
  res.redirect('/auth/');
});

module.exports = router;
