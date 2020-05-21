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

//Importing the routes
const indexRouter = require('./routes/index');
const authenticationRouter = require('./routes/authentication');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const petRouter = require('./routes/pet');
const reviewRouter = require('./routes/review');
const aboutusRouter = require('./routes/aboutus');
const faqRouter = require('./routes/faq');

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

hbs.registerHelper('date', (value) => {
  //we will get the date in the front end and we will call it value
  const dt = value;
  //we will make some javascript on to it to turn it into a nice date
  //we will return that nicely formatted date

  return `${dt
    .getDate()
    .toString()
    .padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
    .getFullYear()
    .toString()
    .padStart(4, '0')}`;
  /*
    return `${dt
      .getDate()
      .toString()
      .padStart(2, '0')}/${(dt.getMonth() + 1).toString().padStart(2, '0')}/${dt
      .getFullYear()
      .toString()
      .padStart(4, '0')}
      ${dt
      .getHours()
      .toString()
      .padStart(2, '0')}:${dt
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
      */
});

//Setting up image visualization
app.use(express.static(process.env.PWD + '/images'));

//Mounting the routes
app.use('/', indexRouter);
app.use('/authentication', authenticationRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/pet', petRouter);
app.use('/review', reviewRouter);
app.use('/aboutus', aboutusRouter);
app.use('/faq', faqRouter);

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
