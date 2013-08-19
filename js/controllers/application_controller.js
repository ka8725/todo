Todos.ApplicationController = Ember.Controller.extend({
  logout: function() {
    this.set('loggedIn', false);
    localStorage.clear();
    this.transitionToRoute('login');
  }
});
