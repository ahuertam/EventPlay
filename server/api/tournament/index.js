
var express = require('express');
var controller = require('./tournament.controller');

var router = express.Router();

router.get('/', controller.listTournament);//It will load all the events from the database
router.post('/', controller.createTournament);//It will create a new tournament
router.get('/:id', controller.getTournament);//It will load a  tournament with that ID
router.put('/:id/results', controller.editTournament);//It will update  the results  tournament with that ID
router.delete('/:id', controller.removeTournament);//It will remove a  tournament with that ID

module.exports = router;
