const passport = require('passport')
const mongoose = require('mongoose')
const crypto = require('crypto')

require('../models/User')
const User = mongoose.model('User')

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

exports.forgot = async (req, res, next) => {
  // Check if email is attached to an account
  console.log('reset for email', req.body.email)
  try {
    const foundUser = await User.findOne({ email: req.body.email })
    console.log({ foundUser })
    if (!foundUser) {
      req.flash('error', `⚠️ That email does not exist ⚠️`)
    }
    const oneDay = (1000 * 60 * 60) // in milliseconds
    console.log({ oneDay })
    // generate reset token
    const token = crypto.randomBytes(20).toString('hex')
    foundUser.passwordResetToken = token
    // record timestamp - for expiry time
    foundUser.passwordResetExpires = Date.now() + oneDay
    await foundUser.save()
    const resetUrl = `http://${req.headers.host}/account/reset/${token}`
    req.flash('success', `Your reset url:\n${resetUrl}`)
    res.redirect('back')
    return
  } catch (err) {
    req.flash('error', `💀 Something went wrong 💀\n${err.toString()}`)
    res.redirect('/')
  }

  // send email with reset link
  // redirect to login page
}

exports.validateReset = async (req, res, next) => {
  const { token } = req.params
  try {
    const findUser = await User.findOne({
      passwordResetToken: token,
      // mongoose can take objects as queries when searching for entries
      // this saves us have to do additional conditions - see below
      // when the query is complete
      passwordResetExpires: { $gt: Date.now() }
    })
    if (findUser) {
      // A user with a valid token that has not passed the expiry time has been found
      next()
      return
    }
    // const findUser = await User.findOne({ passwordResetToken: token })
    // if (findUser && findUser.passwordResetExpires > Date.now()) {
    //   // reset token is correct and has not expired
    //   next()
    //   return
    // }
    req.flash('error', 'That token is invalid or has expired')
    res.redirect('/')

  } catch(err) {
    req.flash('error', `⚠️ Something went wrong️️ ⚠️\n ${err.toString()}`)
    res.redirect('/')

  }
}


exports.confirmPassword = async (req, res, next) => {
  if (req.body.password === req.body['confirm-password']) {
    console.log('passwords match')
    next()
    return
  }
  console.log('passwords do not match')
  req.flash('error', 'Passwords do not match')
  res.redirect('back')
}

exports.updatePassword = async (req, res, next) => {
  const { token } = req.params
  try {
    const findUser = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() }
    })
    if (findUser) {
      // A user with a valid token that has not passed the expiry time has been found
      findUser.setPassword(req.body.password, async (err, doc) => {
        if (err) {
          throw Error
          // req.flash('error', `⚠️ Something went wrong️️ updating the password ⚠️\n ${err.toString()}`)
          // res.redirect('back')
        }
        if (doc) {
          findUser.passwordResetToken = undefined
          findUser.passwordResetExpires = undefined
          findUser.save()
          req.flash('success', 'Password has been updated')
          res.redirect('/login')
        }
      })
      return
    }
    req.flash('error', 'Password reset token is invalid or has expired. Please request a new token')
    res.redirect('/login')

  } catch (err) {
    req.flash('error', `⚠️ Something went wrong️️ updating the password ⚠️\n ${err.toString()}`)
    res.redirect('back')
  }
}


// http://localhost:3000/account/reset/57e12fc838aff510e36e2a3b7f01a0b05f32f56f