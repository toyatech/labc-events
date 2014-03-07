var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.Types.ObjectId;

var ReservationSchema = new Schema({
  name: String,
  email: String,
  performance: { type: ObjectId, ref: 'Performance' },
  attendees: Number
});

var PerformanceSchema = new Schema({
  startTime: Date,
});

var PerformanceSetSchema = new Schema({
  date: Date,
  performances: [PerformanceSchema]
});

var EventSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  imageURL: String,
  featured: Boolean,
  performanceSets: [PerformanceSetSchema]
});

mongoose.model('Reservation', ReservationSchema);
mongoose.model('Event', EventSchema);

