Todos.TodosView = Ember.View.extend({
  didInsertElement: function() {
    var controller = this.get('controller');
    this.$(".sortable").sortable({
      update: function(event, ui) {
        var indexes = [];

        $(this).find('li').each(function(index) {
          indexes[index] = $(this).data('id');
        });

        $(this).sortable('cancel');

        controller.updateSortOrder(indexes);
      }
    });
  }
});
