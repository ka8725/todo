App.LoginController = Ember.Controller.extend({

  reset: function() {
    this.setProperties({
      username: "",
      password: "",
      errorMessage: ""
    });
  },

  token: localStorage.token,
  tokenChanged: function() {
    var t = this.get('token');
    if (t == null) {
      localStorage.removeItem('token');
    } else {
      localStorage.token = t;
    }
  }.observes('token'),

  login: function() {

    var self = this, data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    $.post('/login', data)
      .done(function(response) {
        self.set('token', response.token);

        var attemptedTransition = self.get('attemptedTransition');
        if (attemptedTransition) {
          attemptedTransition.retry();
          self.set('attemptedTransition', null);
        } else {
          self.transitionToRoute('todos');
        }
      })
      .fail(function(response) {
        self.set('errorMessage', response.responseText);
      });
  }
});
