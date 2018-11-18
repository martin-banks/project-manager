const mongoose = require('mongoose')
require('../models/Project')
const Project = mongoose.model('Project')

// Getting project details to display in proejct page
exports.details = async (req, res, next) => {
  const queryParams = { id: req.params.id }
  try {
    const details = await Project.findById(req.params.id)
    queryParams.details = details
    req.queryParams = queryParams
    // app.render(req, res, '/project', queryParams)
    next()
  } catch (err) {
    // console.error(err)
    req.flash('error', 'Sorry, I can\'t find a project with that id')
    res.redirect('back')
    // TODO -> Create route for error / project not found
  }
}

// Saving new project to DB
exports.add = async (req, res, next) => {
  try {
    // convert keywords and tech list to array from comma separated string
    req.body.keywords = req.body.keywords
      .split(',')
      .map(w => w.trim().toLowerCase())
    req.body.tech = req.body.tech
      .split(',')
      .map(w => w.trim().toLowerCase())

    // Add author details to project entry
    req.body.author = req.user._id
    req.body.author_name = req.user.name

    res.redirect('/projects/1')
    // Create new DB entry and save
    const newProject = new Project(req.body)
    newProject.save()
    // next()
  } catch (err) {
    res.json(err)
  }
}
