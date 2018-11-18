const slug = require('slug')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const projectSchema = new mongoose.Schema({

  created: {
    type: Date,
    default: Date.now
  },

  public: {
    type: Boolean,
    default: false,
  },

  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must be a registered, logged in user to add a new project',
  },

  author_name: {
    type: String,
    required: 'You must be a registered, logged in user to add a new project',
  },

  slug: String,
  display: String,

  // Name / title of the project
  name: {
    type: String,
    trim: true,
    unique: true,
    required: 'A project name is required',
  },

  description_md: {
    type: String,
    trim: true,
    required: false,
    // required: 'A description of the project is required',
  },

  category: {
    type: [ String ],
    trim: true,
    required: 'Please choose at least one category',
  },

  // Keywords lifted from the descriptions - auto-generated
  keywords: {
    type: [String],
    trim: true,
    required: 'Please enter at least one keyword',
  },

  // What was used
  tech: {
    type: [ String ],
    trim: true,
    required: 'Please add at least one piece of tech you used',
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
    // required: 'Please enter the date the project went live',
  },

  // Client info
  // client: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter who the client is',
  // },

  // Description info about hte project
  // brief: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter some details on the project brief'
  // },

  // solution: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter a desxcription of your solution'
  // },
  // what: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter a desctription of what this project is',
  // },
  // why: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter a desctription of why you did it',
  // },
  // how: {
  //   type: String,
  //   trim: true,
  //   required: 'Please enter a desctription of how you did it',
  // },
  // evolution: {
  //   type: String,
  //   trim: true,
  //   // required: 'Please enter how you would like to improve or evolve your solution',
  // },
  // What did you learn
  // learn: {
  //   type: String,
  //   trim: true,
  //   // required: 'Please a brief description of something you learned on this project',
  // },


  // Category types
  // personalProject: {
  //   type: Boolean,
  //   required: false,
  // },
  // newsProject: {
  //   type: Boolean,
  //   required: false,
  // },
  // challenge: {
  //   type: Boolean,
  //   required: false,
  // },
  // experiment: {
  //   type: Boolean,
  //   required: false,
  // },

})

projectSchema.pre('save', function (next) {
  if (!this.isModified('name')) return next()
  this.slug = slug(this.name)
  next()
  // TODO check if project name is unique
})

module.exports = mongoose.model('Project', projectSchema)
