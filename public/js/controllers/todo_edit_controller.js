App.TodoEditController = Ember.ObjectController.extend({
  update: function(todo) {
    var self = this;

    todo.on('becameInvalid', function(todo) {
      self.set('model', todo);
    });

    todo.on('didUpdate', function() {
      self.transitionToRoute('todos');
    });
    todo.save();
  },

  cancel: function(todo) {
    todo.rollback();
    this.transitionToRoute('todos');
  }
});
