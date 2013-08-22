App.TodosController = Ember.ArrayController.extend({
  sortProperties: ['priority'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('priority', index);
    }, this);

    this.get('store').commit();
  }
});
