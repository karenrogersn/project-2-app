'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Welcome to Care My Pet!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

router.get('/faq', (req, res, next) => {
  res.render('faq', { title: 'FAQ Section' });
}); //FAQ page. Displays frequently asked questions.

router.get('/aboutus', (req, res, next) => {
  res.render('aboutus');
}); //About us page. Displays a brief explanation.

module.exports = router;
