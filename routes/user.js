'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const Post = require('./../models/post');
const userRouter = new Router();

//User's profile EDIT. Should have a routGuard
userRouter.get('/edit', (req, res, next) => {
  const userId = req.user._id;
  console.log(userId);
  User.findById(userId)
    .then((user) => {
      //need to change this! Render the proper form
      res.render('editprofile', { user });
    })
    .catch((error) => {
      next(error);
    });
});

//User profile EDIT form submission. Should have a routGuard
userRouter.post('/edit', (req, res, next) => {
  const userId = req.user._id;
  const { name, type, email, location } = req.body;

  User.findByIdAndUpdate(userId, {
    name,
    type,
    email,
    location
  })
    .then(() => {
      res.redirect(`/user/${userId}`);
    })
    .catch((error) => {
      next(error);
    });
});

//Pet details EDIT form submission. Should have a routGuard
userRouter.post('/edit', (req, res, next) => {
  const userId = req.user._id;
  const {
    pet: { name, species, breed, comments }
  } = req.body;

  User.findByIdAndUpdate(userId, {
    pet: {
      name,
      species,
      breed,
      comments
    }
  })
    .then(() => {
      res.redirect(`/user/${userId}`);
    })
    .catch((error) => {
      next(error);
    });
});

//When going to a user's profile we render their profile info, posts and reviews. Should have a button that allows other user to create review. Should have a routGuard
userRouter.get('/:userId', (req, res, next) => {
  console.log('Welcome to your profile, user');
  const userId = req.params.userId;

  let user;

  User.findOne({ _id: userId })
    .then((document) => {
      user = document;

      return Post.find({ creator: userId });
    })
    .then((posts) => {
      res.render('profile', { user, posts });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = userRouter;
