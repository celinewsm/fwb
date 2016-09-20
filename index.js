var express = require('express')
var bodyParser = require('body-parser')
var ejsLayouts = require('express-ejs-layouts')
var morgan = require('morgan')
var db = require('./models')
var app = express()
var session = require('express-session')
var passport = require('./config/ppConfig')
var isLoggedIn = require('./middleware/isLoggedIn')
var flash = require('connect-flash')

app.set('view engine', 'ejs')
app.use(require('morgan')('dev'))
app.use(ejsLayouts)
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + '/static/'))

app.use(session({
  secret: process.env.SESSION_SECRET || "secret message",
  resave: false,
  saveUninitialized: true
}))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  console.log("alerts:",res.locals.alerts)
  console.log("alerts:",res.user)
  res.locals.currentUser = req.user;
  next();
});

app.get('/', isLoggedIn, function(req, res) {
  res.redirect('/user/');
});

app.use('/auth', require('./controllers/auth'))
app.use('/user', require('./controllers/user'))
app.use('/guest', require('./controllers/guest'))

var server = app.listen(process.env.PORT || 3000)

module.exports = server
