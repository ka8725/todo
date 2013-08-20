App.TodoController = Ember.ObjectController.extend({
  isEditing: false,

  saveTodo: function() {
    var todo = this.get('model');
    var data = this.getProperties('priority', 'title', 'due_date');
    todo.setProperties(data);
    this.set('isEditing', false);
    this.get('store').commit();
  },

  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    this.get('store').commit();
  },

  editTodo: function () {
    this.set('isEditing', true);
  },

  acceptChanges: function () {
    this.set('isEditing', false);
  }
});
