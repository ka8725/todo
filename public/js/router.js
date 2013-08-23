App.Router.map(function () {
  this.resource('todos', function() {
    this.resource('todo', { path: '/todo/:todo_id' }, function() {
      this.route('edit');
    });

    this.route('new');
  });
  this.resource('users', function() {
    this.route('new');
  });
  this.route('login');
  this.route('logout');
});

App.LoginRoute = Ember.Route.extend({
  setupController: function(controller, context) {
    controller.reset();
  }
});

App.AuthenticatedRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    var token = this.controllerFor('login').get('token');

    if (token) {
      this.controllerFor('application').set('isLoggedIn', true);
    }
    this._super(controller, model);
  },

  beforeModel: function(transition) {
    var token = this.controllerFor('login').get('token');
    if (!token) {
      localStorage.removeItem('token');
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
    return App.Todo.createRecord({});
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

App.UsersNewRoute = Ember.Route.extend({
  model: function() {
    return App.User.createRecord({});
  }
});

App.ApplicationRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    if (localStorage.token) {
      controller.set('isLoggedIn', true);
    }
    this._super(controller, model);
  }
});
