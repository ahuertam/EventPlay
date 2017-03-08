var express = require('express');
var controller = require('./participant.controller');

var router = express.Router();

router.get('/:event/', controller.listParticipants);//It will load all the participants from the database of that event
router.post('/:event/', controller.createParticipant);//It will create a new participant
router.delete('/:event/:id', controller.removeParticipant);//It will remove a  Participant with that ID

module.exports = router;
