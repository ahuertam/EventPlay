var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/', controller.createUser);
router.put('/:id/edit', controller.editUser);
router.delete('/:id', controller.removeUser);

module.exports = router;
