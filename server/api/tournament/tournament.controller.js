const _ = require('lodash');
mongoose = require('mongoose');
Tournament = require('./tournament.model');
user = require('../user/user.model');

exports.createTournament = function(req, res, next) {
	const newTournament = new Tournament({
		name: req.body.name,
    _event : "58bee1c605506a44446e7285",
    type:req.body.type
	});

	newTournament.save(function(err, event) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
			return res.send(200);
	});
};
exports.listTournament = function(req, res, next) {

};
exports.getTournament = function(req, res, next) {

};
exports.editTournament = function(req, res, next) {

};
exports.removeTournament = function(req, res, next) {

};
