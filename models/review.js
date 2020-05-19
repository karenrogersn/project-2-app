'use strict';

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 140,
    required: true
  },
  message: {
    type: String,
    maxlength: 2000
  },

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  score: {
    type: Number
  }
});

module.exports = mongoose.model('Review', reviewSchema);
