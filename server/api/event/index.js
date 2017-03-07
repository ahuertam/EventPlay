
var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.post('/', controller.createEvent);
router.get('/:id', controller.seeEvent);
router.put('/:id/close', controller.closeEvent);
router.delete('/:id', controller.removeEvent);

module.exports = router;
