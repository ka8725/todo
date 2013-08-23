App.TodosNewController = Ember.ObjectController.extend({
  create: function(todo) {
    var self = this;

    todo.on('becameInvalid', function(todo) {
      self.set('model', todo);
    });

    todo.on('didCreate', function() {
      self.transitionToRoute('todos');
    });


    todo.save();
  },

  cancel: function(todo) {
    todo.deleteRecord();
    this.transitionToRoute('todos');
  }
});
