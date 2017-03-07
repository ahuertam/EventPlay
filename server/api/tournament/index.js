
var express = require('express');
var controller = require('./tournament.controller');

var router = express.Router();

router.post('/', controller.createTournament);
router.get('/:id', controller.getTournament);
router.put('/:id/results', controller.editTournament);
router.delete('/:id', controller.removeTournament);

module.exports = router;
