App.UsersNewController = Ember.ObjectController.extend({
  register: function() {
    var data = this.getProperties('username', 'password');
    var user = App.User.createRecord(data);

    var self = this;

    user.on('becameInvalid', function(user) {
      self.set('model', user);
    });

    user.on('didCreate', function() {
      self.transitionToRoute('login');
    });
    user.save();
  }
});
