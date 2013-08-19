App.Todo = DS.Model.extend({
  title: DS.attr('string'),
  dueDate: DS.attr('date'),
  priority: DS.attr('number')
});

App.Todo.FIXTURES = [
 {
   id: 1,
   title: 'Learn Ember.js',
   dueDate: new Date('2013-08-27'),
   priority: 2
 },
 {
   id: 2,
   title: 'Have an interview',
   dueDate: new Date('2013-08-19'),
   priority: 1
 },
 {
   id: 3,
   title: 'Visit parents',
   dueDate: new Date('2013-08-17'),
   priority: 0
 }
];
