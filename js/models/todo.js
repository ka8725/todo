Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  dueDate: DS.attr('date'),
  priority: DS.attr('number')
});

Todos.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js',
   dueDate: '27.08.2013',
   priority: 0
 },
 {
   id: 2,
   title: 'Have an interview',
   dueDate: '19.08.2013',
   priority: 2
 },
 {
   id: 3,
   title: 'Visit parents',
   dueDate: '17.08.2013',
   priority: 1
 }
];
