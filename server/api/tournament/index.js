
var express = require('express');
var controller = require('./tournament.controller');

var router = express.Router();

router.get('/:event/', controller.listTournament);//It will load all the events from the database associated to the event
router.post('/:event/', controller.createTournament);//It will create a new tournament
router.get('/:event/:id', controller.getTournament);//It will load a  tournament with that ID
router.put('/:event/:id/results', controller.editTournament);//It will update  the results  tournament with that ID
router.delete('/:event/:id', controller.removeTournament);//It will remove a  tournament with that ID

module.exports = router;
