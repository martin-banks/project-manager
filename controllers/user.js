const mongoose = require('mongoose')
const { promisify } = require('es6-promisify')
const fs = require('fs')
const path = require('path')
const md5 = require('md5')

require('../models/User')
require('../models/Project')
const User = mongoose.model('User')
const Project = mongoose.model('Project')

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
    console.log('error in registration', errors)
    req.flash('error', errors.map(err => err.msg))
    return
  }
  next()
}


exports.checkRegisterWhitelist = async (req, res, next) => {
  const { id } = req.params
  console.log({ id })
  try {
    const users = fs
      .readFileSync(path.join(__dirname, '../user-whitelist.txt'), 'utf-8')
      .split('\n')
      .map(email => ({
        email,
        hash: md5(email),
        link: `localhost:3000/register/${md5(email)}`
      }))
      const user = users.filter(u => u.hash === id)
      console.log({ user })
      if (user.length) {
        res.locals.email = user[0].email
        next()
        return
      }
      req.flash('error', 'Sorry, that address is not valid')
      res.redirect('/')
      return
  } catch (err) {
    req.flash('error', err.toString())
    res.redirect('/')
  }
}

exports.register = async (req, res, next) => {
  const { name, email } = req.body
  const user = new User({ name, email })
  // register user
  User.register(user, req.body.password, (err, success) => {
    console.log(err || success)
    next()
  })
  // const register = promisify(User.register, user)
  // await register(user, req.body.password)
}

exports.updateAccount = async (req, res, next ) => {
  const updates = {
    name: req.body.name,
    email: req.body.email,
  }
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id }, 
      { $set: updates },
      { new: true, runValidators: true, context: 'query' }
    )
    req.flash('success', 'Account details updated')
    // req.session.save(err => {
    //   res.redirect('/account')
    // })
    next()
  } catch (err) {
    console.log(err)
    res.json(err)
  }
}


exports.profile = async (req, res, next) => {
  try {
    const userDetails = await User
      .findOne({ _id: req.params.id || req.user._id})
      .populate('projects')

    res.locals.profile = {
      projects: userDetails.projects,
      name: userDetails.name,
    }
    next()
  } catch (err) {
    req.flash('error', 'Cannot find profile details')
    res.redirect('/')
  }
}
