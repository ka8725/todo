App.Router.map(function () {
  this.resource('todos', function() {
    this.route('new');
  });
  this.resource('todo', { path: '/todo/:todo_id' }, function() {
    this.route('edit');
  });
  this.route('login');
  this.route('logout');
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
    var loginController = this.controllerFor('login');
    loginController.set('attemptedTransition', transition);
    this.transitionTo('login');
  },

  getJSONWithToken: function(url) {
    var token = this.controllerFor('login').get('token');
    return $.getJSON(url, { token: token });
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

App.TodoRoute = App.AuthenticatedRoute.extend({
  setupController: function(controller, model) {
    this.controllerFor('todo.edit').set('model', model);
    this._super(controller, model);
  },

  model: function(params) {
    return App.Todo.find(params.todo_id);
  }
});

App.LogoutRoute = Ember.Route.extend({
  redirect: function() {
    this.controllerFor('login').set('token', null);
    this.transitionTo('login');
  }
});
