var mongoose = require('mongoose');

mongoose.connect("localhost", "labc-events");

require('../models');

var Event = mongoose.model('Event');

var interval = 10;

Event.collection.remove(function(err) {
  if (err) console.log(err);
});

function getPerformances(time, end) {
  var performances = [];
  while (time <= end) {
    performances.push({startTime: new Date(time)});
    time.setMinutes(time.getMinutes() + 10);
  }
  return performances;
}

function getPerformanceSets(dates, time, end) {
  var performanceSets = [];
  dates.forEach(function(date) {
    var time = new Date(date);
    var start = new Date(time);
    start.setHours(start.getHours() + 19);
    var end = new Date(time);
    end.setHours(end.getHours() + 21);
    var performanceSet = {date:date};
    performanceSet.performances = getPerformances(start, end);
    performanceSets.push(performanceSet);
  });
  return performanceSets;
} 

var event = {name: 'A Walk to the Cross', description: 'An interactive prayer walk through the events of the passion week.', startDate: new Date('April 17, 2014'), endDate: new Date('April 18, 2014'), imageURL: './awalktothecrosspromo.png', featured: true};

event.performanceSets = getPerformanceSets([new Date('04/17/2014 00:00:00'), new Date('04/18/2014 00:00:00')]);

Event.create(event, function(err) {
  if (err) console.log(err);
  process.exit(0);
});
