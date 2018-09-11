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

})

userSchema.plugin(
  passportLocalMongoose,
  { usernameField: 'email' }
)
userSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('User', userSchema)