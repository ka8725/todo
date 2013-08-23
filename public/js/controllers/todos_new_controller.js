App.TodosNewController = Ember.ObjectController.extend({
  create: function(todo) {
    var data = this.getProperties('title', 'priority', 'due_date');
    var todo = App.Todo.createRecord(data);

    var self = this;

    todo.on('becameInvalid', function(todo) {
      self.set('model', todo);
    });

    todo.on('didCreate', function() {
      self.set('priority', '');
      self.set('title', '');
      self.set('due_date', '');
      self.transitionToRoute('todos');
    });
    todo.save();
  }
});
