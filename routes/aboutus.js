'use strict';

const { Router } = require('express');

const aboutusRouter = new Router();

aboutusRouter.get('/aboutus', (req, res) => {
  res.render('aboutus');
});

module.exports = aboutusRouter;
