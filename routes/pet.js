'use strict';
const { Router } = require('express');

const User = require('./../models/user');

const petRouter = new Router();

//the objective of this route handler is only to modify the pet property of the user model

//CREATE A PET

petRouter.get('/create', (req, res) => {
  res.render('petcreate');
}); //this will render the form

petRouter.post('/create', (req, res, next) => {
  //first get the user
  const userId = req.user._id;
  const { name, species, breed, comments } = req.body;
  const pet = {
    name,
    species,
    breed,
    comments
  };
  User.findByIdAndUpdate(userId, {
    pet
  })
    .then((user) => res.redirect(`/user/${userId}`))
    .catch((error) => next(error));
}); //this will post the pet information on the user

// get and post using the user id /:userId/petedit

//Pet details EDIT form submission. Should have a routGuard
petRouter.post('/:userId/petedit', (req, res, next) => {
  const userId = req.params.userId;
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

module.exports = petRouter;
