App = new Backbone.Marionette.Application();

App.addRegions({
  content: '#content'
});

Performance = Backbone.Model.extend({});

Performances = Backbone.Collection.extend({
  model: Performance
});

PerformanceSet = Backbone.Model.extend({
  formattedDate: function() { return moment(new Date(this.date)).format('dddd, MMMM Do'); }
});

PerformanceSets = Backbone.Collection.extend({
  model: PerformanceSet,
  url: '/performanceSets'
});

PerformanceView = Backbone.Marionette.ItemView.extend({
  template: '#performance-template',
  tagName: 'tr'
});

PerformancesView = Backbone.Marionette.CompositeView.extend({
  tagName: "table",
  className: "table table-condensed",
  template: "#performances-template",
  itemView: PerformanceView,
  initialize: function() {
    this.listenTo(this.collection, "sort", this.renderCollection);
  }, 
  appendHtml: function(collectionView, itemView){
    collectionView.$("tbody").append(itemView.el);
  }
});

PerformanceSetView = Backbone.Marionette.CompositeView.extend({
  className: 'col-md-2',
  template: '#performance-set-template',
  itemView: PerformancesView,
  initialize: function() {
    this.listenTo(this.collection, "sort", this.renderCollection);
  },
  appendHtml: function(collectionView, itemView) {
    collectionView.append(itemView.el);
  }
});

App.addInitializer(function(options) {
  var performanceSetView = new PerformanceSetView({
    collection: options.performanceSets
  });
  _.each(performanceSetView.collection.models, function(model) {
    alert(JSON.stringify(model.formattedDate));
  });
  App.content.show(performanceSetView);
});

$(document).ready(function() {
  var performanceSets = new PerformanceSets();
  performanceSets.fetch({
    success: function(collection) {
      //alert(JSON.stringify(collection));
      App.start({performanceSets: collection});
    }
  });
});
