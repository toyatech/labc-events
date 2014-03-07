EventsApp = new Backbone.Marionette.Application();

EventsApp.addRegions({
  headerRegion: '#header',
  contentRegion: '#content',
  footerRegion: '#footer'
});

Event = Backbone.Model.extend({});

Events = Backbone.Collection.extend({
  model: Event,
  url: '/events'
});

PerformanceView = Backbone.Marionette.ItemView.extend({
  template: '#performance-template',
  tagName: 'tr',
  className: 'performance'
});

PerformancesView = Backbone.Marionette.CompositeView.extend({
  tagName: 'table',
  id: 'performances',
  className: 'table table-condensed',
  template: '#performances',
  itemView: PerformanceView,
  initialize: function() {
    this.listenTo(this.collection, "sort", this.renderCollection);
  },
  appendHtml: function(collectionView, itemView){
    collectionView.$('tbody').append(itemView.el);
  }
});

PerformanceSetView = Backbone.Marionette.ItemView.extend({
  tagName: 'div',
  className: 'col-md-2',
  template: 'performance-set'
});

PerformanceSetsView = Backbone.Marionette.CompositeView.extend({
  tagName: 'div',
  id: 'performanceSets',
  className: 'row',
  itemView: PerformanceSetView,
  initialize: function() {
    this.listenTo(this.collection, "sort", this.renderCollection);
  },
  appendHtml: function(collectionView, itemView) {
    collectionView.$('div').append(itemView.el);
  }
});


EventsView = Backbone.Marionette.CompositeView.extend(
  tagName:

FeaturedEventsIndicatorsView = Backbone.Marionette.CollectionView.extend({
  

FeaturedEventsView = Backbone.Marionette.CompositeView.extend({
  tagName: 'div',
  id: 'featured-events',
  className: 'carousel slide',
  attributes: {
    'data-ride': 'carousel'
  }
});
  

EventsApp.addInitializer(function(options) {
  var performancesView = new PerformancesView({
    collection: options.performances
  });
  EventsApp.contentRegion.show(performancesView);
});

$(document).ready(function() {
  var events = new Events();
  EventsApp.start({performances: performances});
});
