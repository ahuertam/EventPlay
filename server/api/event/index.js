
var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.listEvent);//It will load all the events from the database
router.post('/', controller.createEvent);//It will create a new Event
router.get('/:id', controller.seeEvent);//It will load the specific Event
router.put('/:id/close', controller.closeEvent);//It will close the specific Event
router.delete('/:id', controller.removeEvent);//It will remove the specific Event

module.exports = router;
