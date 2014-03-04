(function($) {

  var Reservation = Backbone.Model.extend({});

  var Reservations = Backbone.Collection.extend({
    model: Reservation
  });
 
  var Performance = Backbone.Model.extend({
    timeFormatted: function() {
      return moment(this.get('time')).format('h:mmA');
    },
    spacesAvailable: function() {
      return 6 - this.get('reservations').length;
    }
  });

  var Performances = Backbone.Collection.extend({
    model: Performance
  });
  
  var Event = Backbone.Model.extend({});

  var Events = Backbone.Collection.extend({
    model: Event,
    url: '/events'
  });

  var FeaturedEvents = Backbone.Collection.extend({
    model: Event,
    url: '/featuredEvents'
  });

  var NewReservationView = Backbone.View.extend({
    el: $('#reservation'),
    initialize: function() {
      this.render();
    },
    render: function() {
      var template = _.template($("#newreservation-template").html(), {});
      this.$el.html(template);
      return this;
    }
  }); 

  var TimeSlotsView = Backbone.View.extend({
    el: $('#timeslots'),
    initialize: function() {
      var self = this;
      this.collection = new TimeSlots;
      this.collection.fetch({
        success: function(collection) {
        }
      });
    },
    render: function() {
      var template = _.template($("#timeslots-template").html(), 
        {timeSlots: this.collection.models});
      this.$el.html(template);
      return this;
    }
  });

  var FeaturedEventsView = Backbone.View.extend({
    render: function() {
      var self = this;
      var template = _.template(
        $('#featured-events-template').html(), 
        {featuredEvents: this.featuredEvents.models}
      );
      this.$el.html(template);
      return this;
    }
  });

  var EventsListView = Backbone.View.extend({
    initialize: function() {
      var self = this;
      this.events = new Events;
      this.events.fetch({
        success: function() {}
      });
    },
    render: function() {
      var self = this;
      var template = _.template($('#events-list-template').html(), {});
      return this;
    }
  });

  var EventsHomeView = Backbone.View.extend({
    el: $('#content'),
    initialize: function() {
      var self = this;
      this.featuredEventsView = new FeaturedEventsView();
      this.featuredEventsView.featuredEvents = new FeaturedEvents();
      //this.eventsListView = new EventsListView();
      this.featuredEventsView.featuredEvents.fetch({
        success: function() {
          self.render();
        }
      });
    },
    render: function() {
      var template = _.template($('#events-home-template').html(), {});
      this.$el.html(template); 
      this.featuredEventsView.setElement(this.$('#featured-events')).render();
      //this.eventsListView.setElement(this.$('#events-list')).render();
      return this;
    }
  });

  var eventsHomeView = new EventsHomeView();

})(jQuery);
