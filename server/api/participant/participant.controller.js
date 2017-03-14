const _ = require('lodash');
mongoose = require('mongoose');
Participant = require('./participant.model');
user = require('../user/user.model');

exports.createParticipant = function(req, res, next) {
	const newParticipant = new Participant({
		name: req.body.name,
    points:req.body.points,
		_event : req.params.event
	});

	newParticipant.save(function(err, participant) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
			return res.send(200);
	});
};

exports.removeParticipant = function(req, res, next) {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: 'Specified id is not valid' });
	}
	Participant.remove({_id: req.params.id }, (err) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			message: 'Participant has been removed!'
		});
	});
};

exports.updatePoints = function(req, res, next) {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({ message: 'Specified id is not valid' });
   }
	Participant.findByIdAndUpdate(req.params.id ,{
		points: req.body.points,
		active:req.body.active
	},
	(err) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			message: 'Participant Updated!'
		});
	});
};
exports.listParticipants = function(req, res, next) {
	console.log(req.body);
	Participant.find({_event:req.params.event})
    .exec((err, participants) => {
      if (err) {
        return res.send(err);
      }
      return res.json(participants);
		});
};
