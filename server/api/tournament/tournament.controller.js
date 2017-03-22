const _ = require('lodash');
mongoose = require('mongoose');
Tournament = require('./tournament.model');
user = require('../user/user.model');

exports.createTournament = function(req, res, next) {
	const newTournament = new Tournament({
		name: req.body.name,
    _event : req.params.event
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
	Tournament.find({_event: req.params.event})
    .exec((err, tournaments) => {
      if (err) {
        return res.send(err);
      }
      return res.json(tournaments);
		});
};
exports.getTournament = function(req, res, next) {
	console.log(req.params.id);
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: 'Specified id is not valid' });
	}
	Tournament.findById(req.params.id, (err, tournaments) => {
			if (err) {
				return res.send('error ' + err );
			}
			return res.json(tournaments);
		});
};
exports.editTournament = function(req, res, next) {

};
exports.removeTournament = function(req, res, next) {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: 'Specified id is not valid' });
	}

	Tournament.remove({ _id: req.params.id }, (err) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			message: 'Tournament has been removed!'
		});
	});
};
