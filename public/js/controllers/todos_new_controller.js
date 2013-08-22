App.TodosNewController = Ember.ObjectController.extend({
  create: function(todo) {
    var data = this.getProperties('title', 'priority', 'due_date');
    var todo = App.Todo.createRecord(data);

    var self = this;

    todo.on('didCreate', function() {
      self.set('title', '');
      self.set('priority', '');
      self.set('due_date', '');
    });
    todo.save();
  }
});
