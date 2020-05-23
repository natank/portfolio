const isAuth = require('../middleware/is-auth').isLoggedIn;

const express = require("express");
const guestController = require('../controllers/guest')
const router = express.Router();

router.get('/', guestController.getHome);

module.exports = router;  