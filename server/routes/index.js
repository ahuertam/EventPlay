var path = require('path');

module.exports = function(app) {

  app.use('/api/event', require('../api/event'));
  app.use('/api/event/tournament', require('../api/tournament'));
  app.use('/api/event/participant', require('../api/participant'));
  app.use('/user', require('../api/tournament'));


	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });
};
