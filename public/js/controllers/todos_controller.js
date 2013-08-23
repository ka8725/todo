App.TodosController = Ember.ArrayController.extend({
  sortProperties: ['priority'],

  updateSortOrder: function(indexes) {
    this.forEach(function(item) {
      var index = indexes[item.get('id')];
      item.set('priority', index);
    }, this);

    this.get('store').commit();
  },

  sortedContent: (function() {
    var content;
    content = this.get("content") || [];
    return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
      content: content.toArray(),
      sortProperties: this.get('sortProperties'),
      sortAscending: this.get('sortAscending')
    });
  }).property("content.@each", 'sortProperties', 'sortAscending'),

  doSort: function(sortBy) {
    var previousSortBy;
    previousSortBy = this.get('sortProperties.0');
    if (sortBy === previousSortBy) {
      return this.set('sortAscending', !this.get('sortAscending'));
    } else {
      set('sortAscending', true);
      return this.set('sortProperties', [sortBy]);
    }
  }
});
