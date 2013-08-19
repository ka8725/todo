App.TodosController = Ember.ArrayController.extend({
  sortProperties: ['priority'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('priority', index);
    }, this);
  },

  createTodo: function() {
    var data = this.getProperties('title', 'due_date', 'priority')

    var todo = App.Todo.createRecord(data);

    this.set('title', '');
    this.set('due_date', '');
    this.set('priority', '');

    todo.save();
  }
});
