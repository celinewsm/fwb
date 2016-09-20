var express = require('express')
var db = require('../models')
var passport = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var router = express.Router()
var multer  = require('multer')
var upload = multer({ dest: 'static/img/uploads/' })

router.get('/', isLoggedIn, function (req, res) {
  db.user.findAll().then(function(allUsers) {
    var focusList = []
    allUsers.forEach(function(user){
      focusList.push(user.focus)
    })
    focusList.sort()
    console.log(focusList);
    // console.log("foundUser: ",foundUser);
    // users will be an array of all User instances
      res.render('user/index', {focus: focusList})
  })
})

router.get('/profile', isLoggedIn, function (req, res) {
  db.user.find({
    where: {id: req.session.passport.user}
    }).then(function (foundUser) {
      db.user.findAll().then(function(allUsers) {
        var focusList = []
        allUsers.forEach(function(user){
          focusList.push(user.focus)
        })
        focusList.sort()
        console.log(focusList);
        // console.log("foundUser: ",foundUser);
        // users will be an array of all User instances
          res.render('user/profile', {focus: focusList})
      })
    })
})

router.post('/profile', function (req, res) {
  console.log(req.user)
  db.user.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    focus: req.body.focus,
    bio: req.body.bio,
    skills: req.body.skills,
    link: req.body.link
  }, {
    where: {
      email: req.body.email
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })
})


router.post('/profile/upload', upload.single('avatar'), function (req, res, next) {
  console.log("req.file:",req.file)

  db.user.update({
    profileImg: req.file.path.replace("static/", "/")
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})


module.exports = router
