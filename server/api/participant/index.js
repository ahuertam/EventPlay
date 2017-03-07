var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.post('/', controller.createParticipant);
router.delete('/:id', controller.removeParticipant);

module.exports = router;
