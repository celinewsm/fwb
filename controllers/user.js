var express = require('express')
var db = require('../models')
var passport = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var router = express.Router()

router.get('/', function (req, res) {
  console.log(req.session)
  res.render('user/index')
})

router.get('/profile', function (req, res) {
  res.render('user/profile')
})

router.post('/profile', function (req, res) {
  console.log(req.user)
  db.user.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    // focus: req.body.focus
    bio: req.body.bio
    // skills: req.body.skills,
    // link: req.body.link
  }, {
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })
})

module.exports = router
