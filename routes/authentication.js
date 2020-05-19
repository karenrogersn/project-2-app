'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new Router();

authenticationRouter.get('/signup', (req, res, next) => {
  res.render('signup');
});

authenticationRouter.post('/signup', (req, res, next) => {
  const { name, email, type, location, password, pet } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        type,
        location,
        passwordHash: hash,
        pet: {
          name,
          species,
          breed,
          image,
          comments
        }
      });
    })
    .then((user) => {
      req.session.user = user._id;
      res.redirect('/');
    })
    .catch((error) => {
      next(error);
    });
});

authenticationRouter.get('/signin', (req, res, next) => {
  res.render('signin');
});

authenticationRouter.post('/signin', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      }
    })
    .then((result) => {
      if (result) {
        req.session.user = user._id;
        res.redirect('/');
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

authenticationRouter.post('/signout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = authenticationRouter;
