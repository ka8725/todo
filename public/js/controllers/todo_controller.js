App.TodoController = Ember.ObjectController.extend({
  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();

    todo.on('didDelete', function() {
      self.transitionToRoute('todos');
    });

    todo.save();
  }
});
