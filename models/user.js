const mongoose = require('mongoose')
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

mongoose.Promise = global.Promise

const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address'],
    required: 'Please add an email address',
  },
  name: {
    type: String,
    required: 'Please add a name',
  },
  avatar: {
    type: String,
    required: false,
  },
  passwordResetToken: String,
  passwordResetExpires: Date,

  loginToken: {
    type: String,
    required: false, //'You forgot the login token',
  },

  permissions: {
    type: Array,
    default: [
      'none',
    ]
  }
})

// placeholder - untested
// ep 38
// find projects where the user's _id is === projects author prop
userSchema.plugin(
  passportLocalMongoose,
  { usernameField: 'email' }
)
userSchema.plugin(mongodbErrorHandler)
 
userSchema.virtual('projects', {
  ref: 'Project', // model to use
  localField: '_id', // field on the user - what i'm pairing onto - parent
  foreignField: 'author' // field on the project - what i'm pairing to - child
})


module.exports = mongoose.model('User', userSchema)
