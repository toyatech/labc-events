var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect("localhost", "labc-events", 27017);

require('./models');

var Reservation = mongoose.model('Reservation');
var Event = mongoose.model('Event');

var sendJSONFile = function(err, res, data) {
  if (err) console.log(err);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname, 'public/index.html'));
});

app.get('/reservations', function(req, res) {
  Reservation.find().exec(function(err, data) {
    sendJSONFile(err, res, data);
  });
});

app.get('/performanceSets', function(req, res) {
  Event.findOne({ 'name': 'A Walk to the Cross' }, 'performanceSets', function (err, data) {
    sendJSONFile(err, res, data.performanceSets);
  });
});

app.get('/events', function(req, res) {
  Event.find().sort('startDate').exec(function(err, data) {
    sendJSONFile(err, res, data);
  });
});

app.get('/featuredEvents', function(req, res) {
  Event.find({featured: true}).sort('startDate').exec(function(err, data) {
    sendJSONFile(err, res, data);
  });
});
 
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
