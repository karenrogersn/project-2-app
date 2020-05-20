'use strict';

const { Router } = require('express');
const Post = require('./../models/post');
const postRouter = new Router();

//display all of the posts
postRouter.get('/list', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.render('list', { posts });
    })
    .catch((error) => {
      next(error);
    });
});

//post creation view from the owner’s personal page.
postRouter.get('/postcreate', (req, res, next) => {
  console.log('create a place');
  res.render('postcreate');
});

//post creation form submission. This has to be done from the owners profile
postRouter.post('/postcreate', (req, res, next) => {
  const { title, message, startDate, endDate } = req.body;
  Post.create({
    title,
    message,
    creator: req.user,
    startDate,
    endDate
  })
    .then((post) => {
      res.redirect(`/user/${req.user._id}`); //when the user creates a post, they will see their profile with the created post.
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = postRouter;
