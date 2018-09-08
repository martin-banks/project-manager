const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Nope, failed to login',
  successRedirect: '/',
  successFlash: 'You are logged in',
})