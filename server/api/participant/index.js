var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.get('/', controller.listParticipants);//It will load all the participants from the database of that event
router.post('/', controller.createParticipant);//It will create a new participant
router.delete('/:id', controller.removeParticipant);//It will remove a  tournament with that ID

module.exports = router;
