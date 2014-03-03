var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.Types.ObjectId;

var ReservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  performance: { type: ObjectId, ref: 'Performance' },
  attendees: Number
});

var TimeSlotSchema = new mongoose.Schema({
  time: Date,
  reservations: [{ type: ObjectId, ref: 'Reservation'}]
});

var PerformanceSchema = new mongoose.Schema({
  event: { type: ObjectId, ref: 'Event'},
  startTime: Date,
  reservations: [{ type: ObjectId, ref: 'Reservation'}]
});

var EventSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  imageURL: String,
  featured: Boolean,
  performances: [{ type: ObjectId, ref: 'Performance'}]
});

mongoose.model('Reservation', ReservationSchema);
mongoose.model('Performance', PerformanceSchema);
mongoose.model('Event', EventSchema);
mongoose.model('TimeSlot', TimeSlotSchema);

