var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.get('/loggedIn', controller.loggedIn);
router.get('/personal', controller.personal);

module.exports = router;
