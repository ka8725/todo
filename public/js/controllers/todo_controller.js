App.TodoController = Ember.ObjectController.extend({
  isEditing: false,

  saveTodo: function() {
    this.get('store').commit();
    this.set('isEditing', false);
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
