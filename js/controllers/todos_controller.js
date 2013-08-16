Todos.TodosController = Ember.ArrayController.extend({
  createTodo: function() {
    // Get the todo title set by the "New Todo" text field
    var t = this.get('title');
    var d = this.get('dueDate');
    var p = this.get('priority');

    if (!this.validateFields(t, d, p)) {
      alert('Some field is empty!');
      return;
    }

    // Create the new Todo model
    var todo = Todos.Todo.createRecord({
      title: t,
      dueDate: d,
      priority: p
    });

    // Clear the "New Todo" text field
    this.set('title', '');
    this.set('dueDate', '');
    this.set('priority', '');

    // Save the new model
    todo.save();
  },

  validateFields: function() {
    for (i = 0; i < arguments.length; i++) {
      arg = arguments[i];
      if (!arg || !arg.trim()) {
        return false;
      }
    }
    return true;
  }
});
