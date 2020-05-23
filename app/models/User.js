const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  admin: {
    type: Boolean,
    required: true,
    default: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
})

const User = mongoose.model('User', userSchema);
module.exports = User; 