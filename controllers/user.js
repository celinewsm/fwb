var express = require('express')
var db = require('../models')
var router = express.Router()
var multer = require('multer')
var upload = multer({ dest: 'static/img/uploads/' })
var cloudinary = require('cloudinary')
var methodOverride = require('method-override')

router.use(methodOverride('_method'))

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

router.post('/profile', function (req, res) {
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
  }).catch(function (error) {
    req.flash('error', error.message)
    res.redirect('/user/profile')
  })
})

router.post('/profile/upload', upload.single('avatar'), function (req, res, next) {
  cloudinary.uploader.upload(req.file.path, function (result) {
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

router.get('/deleteUser', function (req, res) {
  db.user.destroy({
    where: { id: req.session.passport.user }
  }).then(function () {
    db.friend.destroy({
      where: {
        $or: [{fromUserId: req.session.passport.user}, {toUserId: req.session.passport.user}]
      }
    }).then(function () {
      req.flash('success', 'Account Deleted')
      res.redirect('/auth/')
    })
  })
})

router.put('/friendRequests/accept', function (req, res) {
  console.log('req.body.userRequestAccepted>>>', req.body.userRequestAccepted)
  db.friend.update({
    status: 'accepted'
  }, {
    where: {
      fromUserId: req.body.userRequestAccepted,
      toUserId: req.session.passport.user
    }
  }).then(function (user) {
    res.send(req.body.userRequestAccepted)
  })
})

router.put('/friendRequests/reject', function (req, res) {
  db.friend.update({
    status: 'rejected'
  }, {
    where: {
      fromUserId: req.body.userRequestRejected,
      toUserId: req.session.passport.user
    }
  }).then(function (user) {
    res.send(req.body.userRequestRejected)
  })
})

router.get('/friendRequests', function (req, res) {
  var tempRequestList = []
  db.friend.findAll({
    where: {
      toUserId: req.session.passport.user,
      status: 'pending'
    },
    include: [{
    model: db.user,
    as: 'fromUserDetails',
    attributes: {
      exclude: ['password']
    },
    include: [{
      model: db.specialization,
      attributes: ['term'],
    }]
  }]
  }).then(function (friendRequestsList) {

    if (friendRequestsList.length === 0) {
      res.render('user/noRequests')
    } else {
      res.render('user/requests', {requestsList: friendRequestsList})
    }
  })
})

router.get('/preview/:userId', function (req, res) {
  db.user.find({
    where: {id: req.params.userId}
  }).then(function (user) {
    db.specialization.find({
      where: { id: user.specializationId }
    }).then(function (specialization) {
      res.render('user/previewProfile', {user: user, specialization: specialization})
    })
  })
})

router.get('/browse/:userId', function (req, res) {
  db.user.find({
    where: {id: req.params.userId}
  }).then(function (user) {
    db.specialization.find({
      where: { id: user.specializationId }
    }).then(function (specialization) {
      res.render('user/userProfile', {user: user, specialization: specialization})
    })
  })
})

// for function for removing repeats in array
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

router.get('/contacts', function (req, res) {
  // find from friends table all users with to and from requests with status as "accepted"
  db.friend.findAll({
    where: {
      status: 'accepted',
      $or: [{fromUserId: req.session.passport.user}, {toUserId: req.session.passport.user}]
    }
  }).then(function (friendList) {
    // in the instance when user has no friends
    if (friendList.length === 0) {
      res.render('user/noFriends')
    }
    var tempArray = []
    var j = 0
    for (var i = 0; i < friendList.length; i++) {
      tempArray.push(friendList[i].fromUserId)
      tempArray.push(friendList[i].toUserId)
      j++
      if (j === friendList.length) {
        console.log('CLEARING J LOOOOOOOOP')
        tempArray = tempArray.unique()
        console.log('req.session.passport.user', req.session.passport.user)
        var indexToRemove = tempArray.indexOf(parseInt(req.session.passport.user, 10))
        tempArray.splice(indexToRemove, 1)

        var friendsDetails = []
        var l = 0
        for (var k = 0; k < tempArray.length; k++) {
          db.user.find({
            where: {id: tempArray[k]}
          }).then(function (user) {
            friendsDetails.push(user)
            l++
            if (l === tempArray.length) {
              var tempSpecializationList = []
              var m = 0
              for (var n = 0; n < friendsDetails.length; n++) {
                db.specialization.findById(friendsDetails[n].specializationId).then(function (foundSpecialization) {
                  tempSpecializationList.push(foundSpecialization.term)
                  m++
                  if (m === tempArray.length) {
                    res.render('user/contacts', {friends: friendsDetails, specializList: tempSpecializationList})
                  }
                })
              }
            }
          })
        }
      }
    }
  })
})

var groupOfUsers = []
var currentSpecializationId
var profileCounter
router.get('/:specializationId', function (req, res) {
  currentSpecializationId = req.params.specializationId
  // find everyone with this specialization
  db.user.findAll({
    where: {specializationId: req.params.specializationId}
  }).then(function (users) {
    // if no type of user found
    if (users.length === 0) {
      db.specialization.find({
        where: {id: req.params.specializationId}
      }).then(function (specialization) {
        res.render('user/noneFound', {specialization: specialization})
      })
    }
    var usersMatch = []
    var groupToRemove = []
    for (var i = 0; i < users.length; i++) {
      usersMatch.push(users[i].id)
    }
    db.friend.findAll().then(function (allFriends) {
      if (allFriends.length !== 0) {
        for (var j = 0; j < allFriends.length; j++) {
          if (allFriends[j].fromUserId === req.session.passport.user || allFriends[j].toUserId === req.session.passport.user) {
            groupToRemove.push(allFriends[j].fromUserId)
            groupToRemove.push(allFriends[j].toUserId)
          }
        }
      }
      groupToRemove.push(req.session.passport.user)
      groupToRemove = groupToRemove.unique()
      // user IDs stored in groupOfUsers
      groupOfUsers = shuffle(getArrayDiff(usersMatch, groupToRemove))

      profileCounter = 0

      if (profileCounter < 0 || profileCounter >= groupOfUsers.length) {
        console.log('profile counter out of range')
        db.specialization.find({
          where: {id: req.params.specializationId}
        }).then(function (specialization) {
          res.render('user/noneFound', {specialization: specialization})
        })
      }
      db.user.find({
        where: {id: groupOfUsers[profileCounter]}
      }).then(function (user) {
        db.specialization.find({
          where: {id: req.params.specializationId}
        }).then(function (specialization) {
          res.render('user/browseProfile', {user: user, specialization: specialization})
        })
      })
    })
  })
})

router.get('/:specializationId/next', function (req, res) {
  if (req.params.specializationId !== currentSpecializationId) {
    res.redirect('/')
  }

  profileCounter++

  if (profileCounter < 0 || profileCounter >= groupOfUsers.length) {
    console.log('profile counter out of range')
    db.specialization.find({
      where: {id: req.params.specializationId}
    }).then(function (specialization) {
      res.render('user/noneFound', {specialization: specialization})
    })
  }

  db.user.find({
    where: {id: groupOfUsers[profileCounter]}
  }).then(function (user) {
    db.specialization.find({
      where: {id: req.params.specializationId}
    }).then(function (specialization) {
      res.render('user/browseProfile', {user: user, specialization: specialization})
    })
  })
})

router.get('/:specializationId/back', function (req, res) {
  if (req.params.specializationId !== currentSpecializationId) {
    res.redirect('/')
  }
  profileCounter--

  if (profileCounter < 0 || profileCounter >= groupOfUsers.length) {
    console.log('profile counter out of range')
    db.specialization.find({
      where: {id: req.params.specializationId}
    }).then(function (specialization) {
      res.render('user/noneFound', {specialization: specialization})
    })
  }

  db.user.find({
    where: {id: groupOfUsers[profileCounter]}
  }).then(function (user) {
    db.specialization.find({
      where: {id: req.params.specializationId}
    }).then(function (specialization) {
      res.render('user/browseProfile', {user: user, specialization: specialization})
    })
  })
})

router.post('/:userId/connect', function (req, res) {
  db.friend.findOrCreate({
    where: {
      fromUserId: req.session.passport.user,
      toUserId: req.params.userId
    },
    defaults: { status: 'pending' }
  }).spread(function (user, created) {
    res.end()
  })
})

function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
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
    if (b.indexOf(key) === -1) {
      ret.push(key)
    }
  }

  return ret
}

module.exports = router
