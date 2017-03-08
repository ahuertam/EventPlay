const _ = require('lodash');
mongoose = require('mongoose');
eventModel = require('./event.model');
user = require('../user/user.model');

exports.listEvent = function(req, res, next) {
	console.log(req.body);
	eventModel.find({}, function(err, events) {
		 	if (err) {
		 		return res.json(err);
		 	}
	        return new Promise((resolve, reject) => {
	            eventModel.populate(events, 'name')
	                .then((_events) => {
	                    _.forEach(events, (event) => {
	                        event.name = _.orderBy(event.name, ['name']);
	                    });
	                    return res.json( events );
	                })
	                .catch((error) => res.status(400).json({ message: 'impossible to retrieve events' }));
	        });
	  	});
};

exports.createEvent = function(req, res, next) {
	console.log(req.body);
	const newEvent = new eventModel({
		name: req.body.name,
		description:req.body.description,
    tokenAccess:req.body.token,
		// _creator:{user}
	});
	newEvent.save(function(err, event) {
		if(err) {
            console.log(err);
			return res.send(500);
		}
		return res.send(200);
	});
};

exports.seeEvent = function(req, res, next) {

};
exports.closeEvent = function(req, res, next) {

};

exports.removeEvent = function(req, res, next) {

};
