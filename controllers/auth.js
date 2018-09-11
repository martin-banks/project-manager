const passport = require('passport')

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Nope, failed to login',
  successRedirect: '/',
  successFlash: 'You are logged in',
})

exports.checkIfLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
    return
  }
  console.log('unlogged in user tried to access /addproject')
  req.flash('error', 'You must be logged in to do that')
  req.session.save(err => {
    console.log('session saved ...')
    res.redirect('/login')
  })
}
