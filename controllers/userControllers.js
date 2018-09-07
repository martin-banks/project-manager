const mongoose = require('mongoose')
const { promisify } = require('es6-promisify')

require('../models/User')
const User = mongoose.model('User')

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.checkBody('name', 'You must supply a name').notEmpty()

  req.checkBody('email', 'That email is not valid').notEmpty()
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: true,
  })

  req.checkBody('password', 'Password cannot be blank').notEmpty()
  req.checkBody('confirm-password', 'Confirm password cannot be blank').notEmpty()
  req.checkBody('confirm-password', 'Passwords do not match').equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    // Implement flashes
    // Check this rendering will work in Next.js
    console.log('error in registration', errors)
    // req.flashes('error', errors.map(err => err.msg))
    // res.render('register', {
    //   body: req.body,
    //   // flashes: re.flash()
    // })
    return
  }
  next()
}

exports.register = async (req, res, next) => {
  const { name, email } = req.body
  const user = new User({ name, email })
  // register user
  // const register = promisify(User.register, user)
  User.register(user, req.body.password, (err, success) => {
    console.log(err || success)
    next()
  })
  // await register(user, req.body.password)
  // next()
}