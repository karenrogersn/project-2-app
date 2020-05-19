'use strict';

const { Router } = require('express');
const User = require('./../models/user');
const userRouter = new Router();

//When going to a user's profile we render their profile info, posts and reviews. Should have a button that allows other user to create review. Should have a routGuard
userRouter.get('/:userId', (req, res, next) => {
  console.log('Welcome to your profile, user');
  const userId = req.params.userIdid;
  userRouter
    .findOne({ _id: userId })
    .then((id) => {
      console.log(id);
      res.render('user', { userId });
    })
    .catch((error) => {
      next(error);
    });
});

//User's can edit their own profile. Should have a routGuard
userRouter.get('/edit', (req, res, next) => {
  const userId = req.params.userIdid;
  User.findOne({ _id: userId })
    .then((user) => {
      res.render('signup', { user });
    })
    .catch((error) => {
      next(error);
    });
});

//owner/petsitter profile edit form submission. Should have a routGuard
userRouter.post('/edit', (req, res, next) => {
  const userId = req.params.userIdid;
  const { name, type, email, location, pet } = req.body;

  User.findOneAndUpdate(
    { _id: userId },
    {
      name,
      type,
      email,
      location,
      pet
    }
  )
    .then(() => {
      res.redirect('/${userId}');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = userRouter;
