const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name must be provided'],
    minlength: [3, 'must provide 3 character name minimum'],
    maxlength: [100, 'name cannot be greater than 100 character'],
  },
  email: {
    type: String,
    required: [true, 'must provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'name must be provided'],
    minlength: [3, 'must provide 3 character password minimum'],
    maxlength: [100, 'password cannot be greater than 100 character'],
  },
});

module.exports = new mongoose.model('User', UserSchema);
