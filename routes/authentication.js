'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const authenticationRouter = new Router();

//Setting up cluodinary for uploading user's image
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multerStorageCloudinary({
  cloudinary,
  folder: 'project-2-2020'
  //limits: { filesize: 10 }
});

const uploader = multer({ storage });

authenticationRouter.get('/signup', (req, res, next) => {
  res.render('signup');
});

//Setting up image-upload system in the signup
authenticationRouter.post('/signup', uploader.single('image'), (req, res, next) => {
  console.log(req.body);
  console.log(req.file.url);
  const { name, email, type, location, password } = req.body;
  const image = req.file.url;

  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        image,
        email,
        type,
        location,
        passwordHash: hash
      });
    })
    .then((user) => {
      req.session.user = user._id;
      if (user.type === 'Petsitter') {
        res.redirect('/');
      } else {
        res.redirect('/pet/create');
      }
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
        res.redirect(`/user/${user._id}`);
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
