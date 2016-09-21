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

var cpUpload = upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }])
router.post('/profile', cpUpload, function (req, res) {
  console.log("req.body",req.body)
  console.log("req.files",req.files)
  // console.log("req.files['img1'][0].path",req.files['img1'][0].path)
  db.user.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    focus: req.body.focus,
    bio: req.body.bio,
    skills: req.body.skills,
    link: req.body.link
    // img1: req.files['img1'][0].path.replace("static/", "/"),
    // img2: req.files['img2'][0].path.replace("static/", "/") ,
    // img3: req.files['img3'][0].path.replace("static/", "/")
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
})

router.post('/img1/upload', upload.single('img1'), function (req, res, next) {
  console.log("req.file:",req.file)

  db.user.update({
    img1: req.file.path.replace("static/", "/")
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })
})


router.post('/img2/upload', upload.single('img2'), function (req, res, next) {
  console.log("req.file:",req.file)

  db.user.update({
    img2: req.file.path.replace("static/", "/")
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })
})


router.post('/img3/upload', upload.single('img3'), function (req, res, next) {
  console.log("req.file:",req.file)

  db.user.update({
    img3: req.file.path.replace("static/", "/")
  }, {
    where: {
      id: req.session.passport.user
    }
  }).then(function (user) {
    res.redirect('/user/profile')
  })
})


module.exports = router
