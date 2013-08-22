App.TodoEditController = Ember.ObjectController.extend({
  update: function() {
    var todo = this.get('model');
    var data = this.getProperties('title', 'priority', 'due_date');
    todo.setProperties(data);

    var self = this;

    todo.on('becameInvalid', function(todo) {
      self.set('model', todo);
    });

    todo.on('didUpdate', function() {
      self.transitionToRoute('todos');
    });
    todo.save();
  }
});
