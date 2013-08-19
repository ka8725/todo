App.TodoController = Ember.ObjectController.extend({
  isEditing: false,

  saveTodo: function() {
    // this.get('store').commit();
    var todo = this.get('model');
    todo.save();
    this.set('isEditing', false);
  },

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
