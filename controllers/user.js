var express = require('express')
var db = require('../models')
var passport = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var router = express.Router()
var multer = require('multer')
var upload = multer({ dest: 'static/img/uploads/' })
var dotenv = require('dotenv').config()
var cloudinary = require('cloudinary')

router.get('/', function (req, res) {
  db.specialization.findAll().then(function (specializations) {
    var specializationList = []
    specializations.forEach(function (specializations) {
      specializationList.push([specializations.term, specializations.id])
    })
    specializationList.sort()
    res.render('user/index', {specialization: specializationList})
  })
})

router.get('/profile', function (req, res) {
  db.specialization.findAll().then(function (specializations) {
    var specializationList = []
    specializations.forEach(function (specializations) {
      specializationList.push([specializations.term, specializations.id])
    })
    specializationList.sort()
    res.render('user/profile', {specialization: specializationList})
  })
})

var cpUpload = upload.fields([{ name: 'img1', maxCount: 1 }, { name: 'img2', maxCount: 1 }])
router.post('/profile', cpUpload, function (req, res) {
  console.log('req.body', req.body)
  console.log('req.files', req.files)
  db.user.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    specializationId: req.body.specialization,
    phone: req.body.phone,
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
  cloudinary.uploader.upload(req.file.path, function (result) {
    // res.send(result)
    db.user.update({
      profileImg: result.url
    }, {
      where: {
        id: req.session.passport.user
      }
    }).then(function (user) {
      res.redirect('/user/profile')
    })
  })
})

router.post('/img1/upload', upload.single('img1'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    db.user.update({
      img1: result.url
    }, {
      where: {
        id: req.session.passport.user
      }
    }).then(function (user) {
      res.redirect('/user/profile')
    })
  })
})

router.post('/img2/upload', upload.single('img2'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    db.user.update({
      img2: result.url
    }, {
      where: {
        id: req.session.passport.user
      }
    }).then(function (user) {
      res.redirect('/user/profile')
    })
  })
})

router.post('/img3/upload', upload.single('img3'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (result) {
    db.user.update({
      img3: result.url
    }, {
      where: {
        id: req.session.passport.user
      }
    }).then(function (user) {
      res.redirect('/user/profile')
    })
  })
})

Array.prototype.unique = function (mutate) {
  var unique = this.reduce(function (accum, current) {
    if (accum.indexOf(current) < 0) {
      accum.push(current)
    }
    return accum
  }, [])
  if (mutate) {
    this.length = 0
    for (var i = 0; i < unique.length; ++i) {
      this.push(unique[i])
    }
    return this
  }
  return unique
}

var groupOfUsers = []
router.get('/:specializationId', function (req, res) {
  db.user.findAll({
    where: {specializationId: specializationId}
  }).then(function (users) {
    var usersMatch = []
    for (var i = 0; i < users.length; i++) {
      usersMatch.push(users[i].id)
    }
    var groupToRemove = []
    db.friend.findAll().then(function (allFriends) {
      for (var j = 0; j < users.length; j++) {
        groupToRemove.push(allFriends[j].fromUserId)
        groupToRemove.push(allFriends[j].toUserId)
      }
      groupToRemove = groupToRemove.unique()
    })
    // user IDs stored in groupOfUsers
    groupOfUsers = shuffle(getArrayDiff(usersMatch, groupToRemove))

    var specializationId = users.specializationId
    var profileImg = users.profileImg
    var img1 = users.img1
    var img2 = users.img2
    var img3 = users.img3
    var firstName = users.firstName
    var bio = users.bio
    var skills = users.skills

    var email = users.email
    var phone = users.phone
    var lastName = users.lastName
    var link = users.link

    // is friend will show contact
    // if () {}

    // if not friend show without contact

  // user will be an instance of User and stores the content of the table entry with id 2. if such an entry is not defined you will get null
  })
})

router.get('/:specializationId', function (req, res) {
  db.user.find({
    where: {specializationId: specializationId}
  }).then(function (user) {

    // is friend will show contact
    // if () {}

    // if not friend show without contact

    // user will be an instance of User and stores the content of the table entry with id 2. if such an entry is not defined you will get null
  })
})

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

function getArrayDiff (a, b) {
  var ret = []
  if (!(Array.isArray(a) && Array.isArray(b))) {
    return ret
  }
  var i
  var key

  for (i = a.length - 1; i >= 0; i--) {
    key = a[i]
    if (-1 === b.indexOf(key)) {
      ret.push(key)
    }
  }

  return ret
}

module.exports = router
