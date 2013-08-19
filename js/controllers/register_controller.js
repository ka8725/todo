Todos.RegisterController = Ember.Controller.extend({
  register: function() {
    var self = this, data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    $.post(Todos.API_URL + '/register.json', data).then(function(response) {

      self.set('errorMessage', response.message);
      if (response.success) {
        alert('Login succeeded!');
        self.set('token', response.token);

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
