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
postRouter.get('/create', (req, res, next) => {
  console.log('create a place');
  res.render('post');
});

//post creation form submission. This is accessed from the owners profile
postRouter.post('/create', (req, res, next) => {
  const { title, message, creator, startDate, endDate } = req.body;
  Post.create({
    title,
    message,
    creator,
    startDate,
    endDate
  })
    .then((post) => {
      res.render('private', { post }); //when the user creates a post, they will see their profile with the created post.
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = postRouter;
