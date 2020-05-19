'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const userRouter = new Router();

//User's can edit their own profile. Should have a routGuard
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

//owner/petsitter profile edit form submission. Should have a routGuard
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

//When going to a user's profile we render their profile info, posts and reviews. Should have a button that allows other user to create review. Should have a routGuard
userRouter.get('/:userId', (req, res, next) => {
  console.log('Welcome to your profile, user');
  const userId = req.params.userId;
  User.findOne({ _id: userId })
    .then((user) => {
      console.log(user);
      res.render('user', { user });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = userRouter;
