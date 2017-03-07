const _ = require('lodash');
mongoose = require('mongoose');
Participant = require('./participant.model');
user = require('../user/user.model');

exports.createParticipant = function(req, res, next) {
	const newParticipant = new Participant({
		name: req.body.name,
    _event : "58bee1c605506a44446e7285",
    points:req.body.points
	});

	newParticipant.save(function(err, event) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
			return res.send(200);
	});
};
exports.removeParticipant = function(req, res, next) {

};

exports.listParticipants = function(req, res, next) {

};
