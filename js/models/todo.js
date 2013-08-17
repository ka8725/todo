Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  dueDate: DS.attr('date'),
  priority: DS.attr('number')
});

Todos.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js',
   dueDate: new Date('27/08/2013'),
   priority: 2
 },
 {
   id: 2,
   title: 'Have an interview',
   dueDate: new Date('19/08/2013'),
   priority: 1
 },
 {
   id: 3,
   title: 'Visit parents',
   dueDate: new Date('17/08/2013'),
   priority: 0
 }
];
