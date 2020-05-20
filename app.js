'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const basicAuthenticationDeserializer = require('./middleware/basic-authentication-deserializer.js');
const bindUserToViewLocals = require('./middleware/bind-user-to-view-locals.js');
const dotenv = require('dotenv');
dotenv.config();
const hbs = require('hbs');

const nodemailer = require('nodemailer');

//Step 1
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

transporter.use(
  'compile',
  hbs({
    viewEngine: 'express-handlebars',
    viewPath: '/views/'
  })
);

//Step 2
const mails = {
  from: `caremypet2@gmail.com`,
  to: `caremypet2@gmail.com`,
  subject: `There's a petsitter interested in your post`,
  text: `It works`,
  template: 'mail'
};

//Step 3
transporter
  .sendMail(mails)
  .then(() => {
    console.log('Email was sent successfully');
  })
  .catch((err) => {
    console.log('Error occurred', err);
  });

//Importing the routes
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const petRouter = require('./routes/pet');
const reviewRouter = require('./routes/review');
const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(join(__dirname, 'views/partials'));

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(
  sassMiddleware({
    src: join(__dirname, 'public'),
    dest: join(__dirname, 'public'),
    outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
    force: process.env.NODE_ENV === 'development',
    sourceMap: true
  })
);
app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 15 * 60 * 60 * 24 * 15,
      httpOnly: true
      // When deploying to heroku, the following options MIGHT break cookies
      // sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production'
    },
    store: new (connectMongo(expressSession))({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(basicAuthenticationDeserializer);
app.use(bindUserToViewLocals);

//Mounting the routes
app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/pet', petRouter);
app.use('/review', reviewRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;
