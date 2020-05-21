'use strict';

const { Router } = require('express');
const Post = require('./../models/post');
const postRouter = new Router();
const routeGuard = require('./../middleware/route-guard');

//CONFIGURING NODEMAILER//
const nodemailer = require('nodemailer');

//Step 1
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

//END OF CONFIGURING NODEMAILER//
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
postRouter.get('/postcreate', routeGuard, (req, res, next) => {
  console.log('create a place');
  res.render('postcreate');
});

//post creation form submission. This has to be done from the owners profile
postRouter.post('/postcreate', routeGuard, (req, res, next) => {
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

postRouter.post('/:postId/contactowner', (req, res, next) => {
  //CONFIGURE THE EMAIL TO BE SENT
  //Step 2
  const postId = req.params.postId;
  //I have the sitter information in the user that's logged in
  const { name, email, _id } = req.user;
  //need information:
  // postid --> we could get the info of the owner
  // user contacting --> req.user
  Post.findById(postId)
    .populate('creator')
    .then((postInfo) => {
      //1) Get all needed info
      const ownerEmail = postInfo.creator.email;
      const ownerName = postInfo.creator.name;
      const { title, message, startDate, endDate } = postInfo;
      //2) create email to be sent
      const mails = {
        from: `${process.env.NODEMAILER_EMAIL}`,
        to: ownerEmail,
        subject: `There's a petsitter interested in your post`,
        html: `
        <h1>Hi ${ownerName}!</h1>
        <h3>There is someone interested in your post</h3>
        <h5>This is the event that ${name} wants to sit for:</h5>
        <ul>
          <li>Title: ${title}</li>
          <li>Starting Date: ${startDate}</li>
          <li>Ending Date: ${endDate}</li>
          <li>Message: ${message}</li>
        </ul>
        <hr>
        <h5>Find below the contact information of ${name}</h5>
        <ul>
          <li>Name: ${name}</li>
          <li>Email: ${email}</li>
          <li><a href="http://localhost:3000/user/${_id}">${name}'s Profile</a></li>
        </ul>
        `
      };
      //3) send email
      return transporter.sendMail(mails);
    })
    .then((result) => {
      console.log('Email was sent successfully');
      res.redirect('/');
    })
    .catch((error) => next(error));
});

postRouter.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .then((post) => {
      console.log(post);
      res.render('singlepost', { post });
    })
    .catch((error) => {
      next(error);
    });
});

//Delete a post, only if you're the person who did it
postRouter.post('/:postId/delete', routeGuard, (req, res, next) => {
  const postId = req.params.postId;

  Post.findOneAndDelete({
    _id: postId,
    creator: req.user._id
  })
    .then(() => {
      console.log('redirecting');
      res.redirect('/post/list');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = postRouter;
