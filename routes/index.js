const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard'/*'/store'*/, ensureAuthenticated, (req, res) =>
  res.render('dashboard'/*'store'*/, {
    user: req.user
  })
);

module.exports = router;
