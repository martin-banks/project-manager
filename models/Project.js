const slug = require('slug')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const projectSchema = new mongoose.Schema({
  
  slug: String,

  // Name / title of the project
  name: {
    type: String,
    trim: true,
    required: 'Please enter a project name',
  },

  display: String,

  // Description info about hte project
  what: {
    type: String,
    trim: true,
    required: 'Please enter a desctription of what this project is',
  },
  why: {
    type: String,
    trim: true,
    required: 'Please enter a desctription of why you did it',
  },
  how: {
    type: String,
    trim: true,
    required: 'Please enter a desctription of how you did it',
  },
  evolution: {
    type: String,
    trim: true,
    required: 'Please enter what else could be done',
  },

  // Keywords lifted from the descriptions - auto-generated
  keywords: {
    type: [String],
    truem: true,
    required: 'Please enter at least one keyword',
  },

  // What was used
  tech: {
    type: [ String ],
    trim: true,
    required: 'Please add at least one tech',
  },

  // What did you learn
  learn: {
    type: String,
    trim: true,
    required: 'Don\'t fprget to add what you learned in this...',
  },


  // Client info
  client: {
    type: String,
    trim: true,
    required: 'Please enter who the client is',
  },

  // Preview links
  publicUrl: {
    type: String,
    trim: true,
    required: false,
  },
  privateUrl: {
    type: String,
    trim: true,
    required: false,
  },

  // Where project files live
  publicRepo: {
    type: String,
    trim: true,
    required: false,
  },
  privateRepo: { 
    type: String,
    trim: true,
    required: false,
  },

  // When was it done
  liveDate: {
    type: Date,
    trim: true,
    required: 'Please enter the date the project went live',
  },

  // Category types
  personalProject: {
    type: Boolean,
    required: false,
  },
  newsProject: {
    type: Boolean,
    required: false,
  },
  challenge: {
    type: Boolean,
    required: false,
  },

  // tags: [ String ],

  // Images to be handled by server to Cloudinary
  // display: {
  //   type: String,
  //   trim: true,
  //   required: 'Display image missing',
  // },
  // thumbnail: {
  //   type: String,
  //   trim: true,
  //   required: 'Thumbnail image missing',
  // },
})

projectSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next()
  this.slug = slug(this.name)
  next()
  // TODO check if project name is unique
})


module.exports = mongoose.model('Store', projectSchema)
