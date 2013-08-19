Todos.Router.map(function () {
  this.resource('todos');
  this.route('login');
  this.route('logout');
  this.route('register');
});

Todos.LoginRoute = Ember.Route.extend({
  setupController: function(controller, context) {
    controller.reset();
  }
});


Todos.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition) {
    if (!this.controllerFor('login').get('token')) {
      this.redirectToLogin(transition);
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


Todos.TodosRoute = Todos.AuthenticatedRoute.extend({
  model: function () {
    return Todos.Todo.find();
  }
});

Todos.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    if (localStorage.token) {
      controller.loggedIn = true;
    } else {
      controller.loggedIn = false;
    }
    this._super(controller, model);
  }
});
