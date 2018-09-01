const slug = require('slug')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a project name',
  },

  slug: String,

  display: {
    type: String,
    trim: true,
    required: 'Display image missing',
  },
  thumbnail: {
    type: String,
    trim: true,
    required: 'Thumbnail image missing',
  },

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
  tech: {
    type: [ String ],
    trim: true,
    required: 'Please add at least one tech',
  },
  learn: {
    type: String,
    trim: true,
    required: 'Don\'t fprget to add what you learned in this...',
  },

  keywords: {
    type: [String],
    truem: true,
    required: 'Please enter at least one keyword',
  },

  client: {
    type: String,
    trim: true,
    required: 'Please enter who the client is',
  },

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


  liveDate: {
    type: Date,
    trim: true,
    required: 'Please enter the date the project went live',
  },

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
})

storeSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next()
  this.slug = slug(this.name)
  next()
  // TODO check if project name is unique
})


module.exports = mongoose.model('Store', storeSchema)
