const _ = require('lodash');
mongoose = require('mongoose');
eventModel = require('./event.model');
user = require('../user/user.model');

exports.listEvent = function(req, res, next) {
	console.log(req.body);
	eventModel.find({})
    .exec((err, events) => {
      if (err) {
        return res.send(err);
      }
      return res.json(events);
		});
};

exports.createEvent = function(req, res, next) {
	// console.log(req.body);
	console.log("esto es create event");
	const newEvent = new eventModel({
		name: req.body.name,
		description:req.body.description,
    tokenAccess:req.body.token,
		imgUrl:req.body.imgUrl
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
	console.log(req.params.id);
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.status(400).json({ message: 'Specified id is not valid' });
	}
	eventModel.findById(req.params.id, (err, events) => {
			if (err) {
				return res.send('error ' + err );
			}
			return res.json(events);
		});

};
exports.closeEvent = function(req, res, next) {

};

exports.removeEvent = function(req, res, next) {
	if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Specified id is not valid' });
  }

  eventModel.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return res.send(err);
    }
    return res.json({
      message: 'Event has been removed!'
    });
  });
};
