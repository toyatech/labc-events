var EventsApp = new Backbone.Marionette.Application();

EventsApp.addRegions({
  header: '#header',
  content: '#content',
  footer: '#footer'
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

<<<<<<< HEAD
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
=======
FeaturedEventsIndicatorView = Backbone.Marionette.ItemView.extend({
  tagName: 'li',
  initialize: function(options) {
    this.itemIndex = options.itemIndex;
  },
  className: function() { if (this.itemIndex === 0) return 'active'; },
  attributes: {
    'data-target': '#featured-events',
    'data-slide-to': function() { return this.itemIndex }
  }
});
>>>>>>> 22956a1a409bbb3353887c513f1e38e94f3bf1bd

FeaturedEventsIndicatorsView = Backbone.Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'carousel-indicators',
  itemView: FeaturedEventsIndicatorView,
  itemViewOptions: function(model, index) {
    return {
      itemIndex: index
    }
  }
});

FeaturedEventsItemView = BackboneMarionette.ItemView.extend({
  template: '#featured-events-item-template',
  initialize: function(options) {
    this.itemIndex = options.itemIndex;
  },
  className: function() { if (this.itemIndex === 0) return 'item active' else return 'item' }
});

FeaturedEventsItemsView = Backbone.Marionette.CollectionView.extend({
  className: 'carousel-inner'
  itemView: FeaturedEventsItemView,
  itemViewOptions: function(model, index) {
    return {
      itemIndex: index
    }
  }
});

FeaturedEventsView = Backbone.Marionette.Layout.extend({
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
