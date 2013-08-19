App.Todo = DS.Model.extend({
  title: DS.attr('string'),
  due_date: DS.attr('string'),
  priority: DS.attr('number')
});
