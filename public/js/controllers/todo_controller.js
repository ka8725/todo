App.TodoController = Ember.ObjectController.extend({
  removeTodo: function() {
    var todo = this.get('model');
    todo.deleteRecord();
    this.get('store').commit();
  }
});
