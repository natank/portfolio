
const express = require("express");
const guestController = require('../controllers/guest')
const router = express.Router();

router.get('/', guestController.getHome);
router.get('/cv', guestController.getCV);
module.exports = router;  