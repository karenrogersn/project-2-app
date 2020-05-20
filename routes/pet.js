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
    .then((user) => res.render('profile'))
    .catch((error) => next(error));
}); //this will post the pet information on the user

module.exports = petRouter;
