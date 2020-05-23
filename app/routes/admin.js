const express = require('express'),
  router = express.Router(),
  adminController = require('../controllers/admin');


const { check } = require('express-validator');

router.get('/', adminController.getDashboard);
module.exports = router;
