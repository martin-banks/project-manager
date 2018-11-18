const mongoose = require('mongoose')
const passport = require('passport')

require('../models/User')
const User = mongoose.model('User')

require('../models/Project')
const Project = mongoose.model('Project')

exports.pagination = async (req, res, next) => {
  // Check for a user and see if that user has private access
  // const foundUser = await User.findOne({ loginToken: id })
  // console.log({ foundUser })

  console.log('user', req.user)

  const { page } = req.params
  const limit = 4
  let skip = (page * limit) - limit
  try {
    const projectsPromise = Project
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ created: -1 })
    const totalProjects = Project.count()

    const [ projects, count ] = await Promise
      .all([ projectsPromise, totalProjects ])
    const pages = Math.ceil(count / limit)

    res.locals.pagination = { pages, page, limit }
    res.locals.projects = projects
  } catch (err) {
    req.flash('error', err.toString())
    res.redirect('/')
  }
  next()
}
