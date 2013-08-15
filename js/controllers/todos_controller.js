Todos.TodosController = Ember.ArrayController.extend({
  createTodo: function () {
    // Get the todo title set by the "New Todo" text field
    var t = this.get('newTitle');

    if (!t || !t.trim()) { return; }

    // Create the new Todo model
    var todo = Todos.Todo.createRecord({
      title: t,
      isCompleted: false
    });

    // Clear the "New Todo" text field
    this.set('newTitle', '');

    // Save the new model
    todo.save();
  }
});
