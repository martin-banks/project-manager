const mongoose = require('mongoose')
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [vaidator.isEmail, 'Invalid email address'],
    required: 'Please add an email address',
  },
  name: {
    type: String,
    required: 'Please add a name',
  },

})

userSchema.plugin(
  passportLocalMongoose,
  { usernameField: 'email' }
)
userSchema(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)
