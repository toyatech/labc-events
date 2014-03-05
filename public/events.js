EventsApp = new Backbone.Marionette.Application();

EventsApp.addRegions({
  contentRegion: "#content"
});

Performance = Backbone.Model.extend({});

Performances = Backbone.Collection.extend({
  model: Performance
});

PerformanceView = Backbone.Marionette.ItemView.extend({
  template: '#performance-template',
  tagName: 'tr',
  className: 'performance'
});

PerformancesView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
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

EventsApp.addInitializer(function(options) {
  var performancesView = new PerformancesView({
    collection: options.performances
  });
  EventsApp.contentRegion.show(performancesView);
});

$(document).ready(function() {
  var performances = new Performances();
  EventsApp.start({performances: performances});
});
