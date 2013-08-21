App.TodosController = Ember.ArrayController.extend({
  sortProperties: ['priority'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('priority', index);
    }, this);

    this.get('store').commit();
  },

  createTodo: function(todo) {
    var data = this.getProperties('title', 'priority', 'due_date');
    var todo = App.Todo.createRecord(data);

    var self = this;

    todo.on('becameInvalid', function(todo) {
      // show errors on the form. code goes here
      console.log(todo.errors);
    });

    todo.on('didCreate', function() {
      // render list. code goes here
      self.set('title', '');
      self.set('priority', '');
      self.set('due_date', '');
    });
    todo.save();
  }
});
