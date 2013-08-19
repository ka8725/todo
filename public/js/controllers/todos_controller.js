App.TodosController = Ember.ArrayController.extend({
  sortProperties: ['priority'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('priority', index);
    }, this);
  },

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
    var todo = App.Todo.createRecord({
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
