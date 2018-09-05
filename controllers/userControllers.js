const mongoose = require('mongoose')
const promisify = require('es6-promisify')

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
  req.checkBoddy('conform-password', 'Confirm password cannot be blank').notEmpty()
  req.checkBody('confirm-pssword', 'Passwords do not match').equals(req.body.password)

  const errors = req.validationErrors()
  if (errors) {
    // Implement flashes
    // Check this rendering will work in Next.js
    req.flashes('error', errors.map(err => err.msg))
    res.render('register', {
      body: req.body,
      flashes: re.flash()
    })
    return
  }
  next()
}

exports.register = async (req, res, next) => {
  const { name, email } = req.body
  const user = new user({ name, email })
  // register user
  const register = promisify(User.register, User)
  await register(user, req.body.password)
  next()
}