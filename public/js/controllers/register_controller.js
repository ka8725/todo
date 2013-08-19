App.RegisterController = Ember.Controller.extend({
  register: function() {
    var self = this, data = this.getProperties('username', 'password');

    // Clear out any error messages.
    this.set('errorMessage', null);

    $.post('/register', data)
      .done(function(response) {

        alert('Registration successfull!')
        self.set('errorMessage', null);
        self.set('username', '');
        self.set('password', '');
      })
      .fail(function(response) {
        self.set('errorMessage', response.responseText);
      });
  }
});
