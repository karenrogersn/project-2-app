'use strict';

const { Router } = require('express');

const faqRouter = new Router();

faqRouter.get('/faq', (req, res) => {
  res.render('faq');
});

module.exports = faqRouter;
