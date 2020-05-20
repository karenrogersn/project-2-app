'use strict';

const { Router } = require('express');
const Review = require('./../models/review');
const reviewRouter = new Router();

//review creation view from the user’s ID
reviewRouter.get('/:userId/review/create', (req, res, next) => {
  console.log('create review');
  res.render('review');
});

reviewRouter.post('/:userId/review/create', (req, res, next) => {
  const { title, message, recipient, score } = req.body;
  reviewRouter
    .create({
      title,
      message,
      creator: req.user,
      recipient,
      score
    })
    .then((review) => {
      res.render('private', { review });
    })
    .catch((error) => {
      next(error);
    });
});

reviewRouter.get(`/:userId/review/edit`, (req, res, next) => {
  console.log('edit review');
  res.render('');
});

reviewRouter.post(`/:userId/review/edit`, (req, res, next) => {
  reviewRouter
    .findByIdAndUpdate(userId, {})
    .then(() => {})
    .catch((error) => {
      next(error);
    });
});

module.exports = reviewRouter;
