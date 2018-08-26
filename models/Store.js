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

  description: {
    type: String,
    trim: true,
    required: 'Please enter a project description',
  },
  // keywords: {
  //   type: [String],
  //   truem: true,
  //   required: 'Please enter at least one keyword',
  // },

  client: {
    type: String,
    trim: true,
    required: 'Please enter who the client is',
  },

  // tech: {
  //   type: [ String ],
  //   trim: true,
  //   required: 'Please add at least one tech',
  // },

  publicRepo: {
    type: String,
    trim: true,
    required: false,
  },
  // privateRepo: { 
  //   type: String,
  //   trim: true,
  //   required: false,
  // },

  publicUrl: {
    type: String,
    trim: true,
    required: false,
  },
  // privateUrl: {
  //   type: String,
  //   trim: true,
  //   required: false,
  // },

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
