const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 32,
    min: 6,
  },
  phone: {
    type: Number,
    contact: {
      type: Number,
      validate: {
        validator: function (v) {
          return /d{10}/.test(v);
        },
        message: '{VALUE} is not a valid 10 digit number!',
      },
    },
  },
  linkedIn: {
    type: String,
    validate: {
      validator: function (v) {
        return /^http(s*):\/\/(www.)*facebook.com\/[a-zA-Z0-9.]+$/.test(v);
      },
      message: 'The URL is not valid',
    },
  },
  zip_code:{
      type:Number,
      validate: {
        validator: function (v) {
          return /^\d{5}(?:[-\s]\d{4})?$/.test(v);
        },
        message: 'Wrong zip-code format',
      },
  }
});

module.exports = mongoose.model('User', userSchema);
