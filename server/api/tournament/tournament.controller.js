const _ = require('lodash');
mongoose = require('mongoose');
Tournament = require('./tournament.model');
user = require('../user/user.model');

exports.createTournament = function(req, res, next) {
	const newTournament = new Tournament({
		name: req.body.name,
    _event : { event},
    points:req.body.points
	});

	newTournament.save(function(err, event) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
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
