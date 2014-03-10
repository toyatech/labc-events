App = new Backbone.Marionette.Application();

App.addRegions({
  content: '#content'
});

Event = Backbone.Model.extend({});
Events = Backbone.Collection.extend({
  model: Event
});

EventHomeLayout = Backbone.Marionette.Layout.extend({
  el: '#content',
  template: '#event-home-template',
  regions: {
    eventImage: '#event-image',
    reservationForm: '#reservation-form',
    performanceSets: '#performance-sets'
  }
});

PerformanceSetView = Backbone.Marionette.ItemView.extend({
  tagName 'div',
  className 'col-md-2'
});

PerformanceSetsView = Backbone.Marionette.CompositeView.extend({
  tagName: 

PerformanceView = Backbone.Marionette.ItemView.extend({
  template: '#performance-template',
  tagName: 'tr',
  className: 'performance'
});

PerformacnesView = Backbone.Marionette.CompositeView.extend({
  tagName: 'table',
  id: function() { },
  className: 'table-stripped table-bordered',
  itemView: PerformanceView,
  initializeL function() {
    this.listenTo(this.collectionView, "sort", this.renderCollection);
  },
  appendHtml: function(collectionView, itemView) {
    collectionView.$('tbody').append(itemView.el);
  }
});

App.addInitializer(function(options) {
  var eventHomeLayout = EventHomeLayout();
  var performanceSetsView = PerformanceSetsView();
