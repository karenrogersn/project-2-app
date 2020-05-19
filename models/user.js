'use strict';

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    type: {
      type: String,
      enum: ['Pet Owner', 'Petsitter']
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    photo: {
      type: String
    },
    petImage: {
      type: String
    },
    location: {
      type: String,
      trim: true
    },
    petName: {
      type: String,
      required: true,
      trim: true
    },
    petSpecies: {
      type: String,
      required: true
    },
    breed: {
      type: String
    },
    additionalComments: {
      type: String,
      maxlength: 1000
    },
    passwordHash: {
      type: String
    },
    status: {
      type: String,
      enum: ['Pending Confirmation', 'Active']
    },
    confirmationCode: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
