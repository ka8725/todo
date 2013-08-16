Todos.TodoController = Ember.ObjectController.extend({
  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  }
});
