(function($) {
 
  var TimeSlot = Backbone.Model.extend({
    timeFormatted: function() {
      return moment(this.get('time')).format('h:mmA');
    },
    spacesAvailable: function() {
      return 6 - this.get('reservations').length;
    }
  });
  
  var TimeSlots = Backbone.Collection.extend({
    model: TimeSlot,
    url: '/timeSlots'
  });

  var NewReservationView = Backbone.View.extend({
    el: $('#reservation'),
    initialize: function() {
      this.render();
    },
    render: function() {
      var template = _.template($("#newreservation-template").html(), {});
      this.$el.html(template);
    }
  }); 

  var TimeSlotsView = Backbone.View.extend({
    el: $('#timeslots'),
    initialize: function() {
      var self = this;
      this.collection = new TimeSlots;
      this.collection.fetch({
        success: function(collection) {
          self.render();
        }
      });
    },
    render: function() {
      var template = _.template($("#timeslots-template").html(), {timeSlots: this.collection.models});
      this.$el.html(template);
    }
  });

  var EventsView = Backbone.View.extend({
    el: $('#content'),
    initialize: function() {
      this.render();
    },
    render: function() {
      var template = _.template($('#events-template').html(), {});
      this.$el.html(template);
    }
  });

  var eventsView = new EventsView();

  //var timeSlotsView = new TimeSlotsView();
  //var newReservationView = new NewReservationView();

})(jQuery);
