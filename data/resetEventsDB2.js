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

var event = new Event({name: 'A Walk to the Cross', description: 'An interactive prayer walk through the events of the passion week.', startDate: new Date('April 17, 2014'), endDate: new Date('April 18, 2014'), imageURL: './awalktothecrosspromo.png', featured: true});

var populatePerformances = function(event, time, end, next) {
  if (time > end) next(event);
  while (time <= end) {
    var performance = new Performance({event: event._id, startTime: time});
    performance.save(function(err) {
      if (err) console.log(err);
      event.performances.push(performance);
      time.setMinutes(time.getMinutes() + interval);
    });
  }
}

populatePerformances(event, new Date('April 17, 2014 19:00:00'), new Date('April 17, 2014 21:00:00'), function(event) {
  populatePerformances(event, new Date('April 18, 2014 19:00:00'), new Date('April 18, 2014 21:00:00'), function(event) {
    event.save(function(err) {
      if (err) console.log(err);
      process.exit(0);
    });
  });
});
