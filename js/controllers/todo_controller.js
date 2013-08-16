Todos.TodoController = Ember.ObjectController.extend({
  isEditing: false,

  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    todo.save();
  },

  editTodo: function () {
    this.set('isEditing', true);
  },

  acceptChanges: function () {
    this.set('isEditing', false);
    this.get('model').save();
  }
});
