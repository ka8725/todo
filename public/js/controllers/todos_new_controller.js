App.TodosNewController = Ember.ObjectController.extend({
  create: function(todo) {
    var data = this.getProperties('title', 'priority', 'due_date');
    var todo = App.Todo.createRecord(data);

    var self = this;

    todo.on('becameInvalid', function(todo) {
      self.set('model', todo);
    });

    todo.on('didCreate', function() {
      self.transitionToRoute('todos');
    });
    todo.save();
  }
});