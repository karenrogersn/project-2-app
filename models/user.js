'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    type: {
      type: String,
      enum: ['Pet Owner', 'Petsitter']
    },
    location: {
      type: String,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },

    pet: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      species: {
        type: String,
        required: true
      },
      breed: {
        type: String
      },
      image: {
        type: String
      },
      comments: {
        type: String,
        maxlength: 1000
      }
    },

    // Work on this after MVP
    photo: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active']
    },
    confirmationCode: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
