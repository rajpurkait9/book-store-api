const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name must provide'],
      trime: true,
      maxlength: [100, 'name cannot be more than 100 character'],
    },
    author: {
      type: String,
      required: [true, 'author name must be present'],
      trim: true,
      maxlength: [30, 'author name cannot be more than 30 character'],
    },
    url: String,

    pages: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: [true, 'price must be present'],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'must provide  a user'],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model('Book', bookSchema);
