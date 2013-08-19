Todos.ApplicationController = Ember.Controller.extend({
  loggedIn: this.controllerFor('login').get('token')
});
