Todos.LoginController = Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      username: "",
      password: "",
      errorMessage: ""
    });
  },

  token: localStorage.token,

  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token'),

  login: function() {
    var self = this, data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    $.post(Todos.API_URL + '/login.json', data).then(function(response) {

      self.set('errorMessage', response.message);
      if (response.success) {
        alert('Login succeeded!');
        self.set('token', response.token);
        self.get('controllers.application').set('loggedIn', true);

        var attemptedTransition = self.get('attemptedTransition');
        if (attemptedTransition) {
          attemptedTransition.retry();
          self.set('attemptedTransition', null);
        } else {
          self.transitionToRoute('todos');
        }
      }
    });
  }
});
