'use strict';

const { Router } = require('express');
const Review = require('./../models/review');
const reviewRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

//review creation view from the user’s ID
reviewRouter.get('/:userId/reviewcreate', (req, res, next) => {
  console.log('create review');
  res.render('reviewcreate');
});

reviewRouter.post('/:userId/reviewcreate', (req, res, next) => {
  const { title, message, recipient, score } = req.body;
  const userId = req.params.userId;
  Review.create({
    title,
    message,
    creator: req.user,
    recipient: userId,
    score
  })
    .then((review) => {
      res.redirect(`/user/${req.user._id}`);
    })
    .catch((error) => {
      next(error);
    });
});

reviewRouter.get(`/:userId/review/edit`, routeGuard, (req, res, next) => {
  console.log('edit review');
  res.render('');
});

reviewRouter.post(`/:userId/review/edit`, routeGuard, (req, res, next) => {
  const userId = req.params.userId;
  Review.findByIdAndUpdate(userId, {})
    .then(() => {})
    .catch((error) => {
      next(error);
    });
});

module.exports = reviewRouter;
