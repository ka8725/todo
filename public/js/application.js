window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

Ember.Handlebars.registerBoundHelper('date', function(date) {
  if (date) {
    return moment(date).format('MMMM Do YYYY');
  }
});

App.LoadingRoute = Ember.Route.extend({});

DS.rejectionHandler = function(reason) {
  if (reason.status == 403) {
    var res = JSON.parse(reason.responseText);
    alert(res['error']);
  }
  throw reason;
};
