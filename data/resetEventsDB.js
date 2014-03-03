var mongoose = require('mongoose');

mongoose.connect("localhost", "labc-events");

require('../models');

var Event = mongoose.model('Event');
var Performance = mongoose.model('Performance');

var interval = 10;

Event.collection.remove(function(err) {
  if (err) console.log(err);
});

Performance.collection.remove(function(err) {
  if (err) console.log(err);
});

var event = new Event({name: 'A Walk to the Cross', description: 'An interactive prayer walk through the events of the passion week.', startDate: new Date('April 17, 2014'), endDate: new Date('April 18, 2014'), imageURL: './awalktothecrosspromo.png'});

var savePerformance = function (eventId, time, end, next) {
  if (time > end) return 0; 
  var performance = new Performance({event: eventId, startTime:time});
  performance.save(function(err) {
    if (err) console.log(err);
    time.setMinutes(time.getMinutes() + interval);
    next(eventId, time, end, next);
  });
}

var pushPerformances = function(event, time, end, next) {
  if (time > end) return 0;
  event.performances.push({event: event._id, startTime: time});
    
event.save(function(err, data) {
  if (err) console.log(err);
  savePerformance(data._id, new Date('April 17, 2014 19:00:00'), new Date('April 17, 2014 21:00:00'), savePerformance);
  savePerformance(data._id, new Date('April 18, 2014 19:00:00'), new Date('April 18, 2014 21:00:00'), savePerformance);
});
