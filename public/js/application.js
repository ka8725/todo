window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});


Ember.Handlebars.registerBoundHelper('date', function(date) {
  if (date) {
    return moment(date).format('MMMM Do YYYY');
  }
});

App.LoadingRoute = Ember.Route.extend({});

Ember.View.reopen({
  enter: function() {
    alert('a');
  }
});
