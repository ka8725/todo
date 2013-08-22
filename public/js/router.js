App.Router.map(function () {
  this.resource('todos', function() {
    this.route('new');
  });
  this.route('login');
  this.route('register');
});

App.LoginRoute = Ember.Route.extend({
  setupController: function(controller, context) {
    controller.reset();
  }
});

App.AuthenticatedRoute = Ember.Route.extend({

  beforeModel: function(transition) {
    var token = this.controllerFor('login').get('token');
    if (!token) {
      this.redirectToLogin(transition);
    } else {
      $.ajaxSetup({
        headers: {
          'X-ACCESS-TOKEN': token
        }
      });
    }
  },

  redirectToLogin: function(transition) {
    alert('You must log in!');

    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  getJSONWithToken: function(url) {
    var token = this.controllerFor('login').get('token');
    return $.getJSON(url, { token: token });
  },

  events: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.redirectToLogin(transition);
      } else {
        alert('Something went wrong');
      }
    }
  }
});

App.TodosRoute = App.AuthenticatedRoute.extend({
  model: function() {
    return App.Todo.find();
  }
});

App.TodosNewRoute = App.AuthenticatedRoute.extend({
  model: function() {
    return App.Todo.find();
  }
});