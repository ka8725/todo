window.Todos = Ember.Application.create({
  API_URL: 'http://localhost:3000'
});

Todos.DateField = Ember.TextField.extend({
  type: 'date',
  hasFocus: false,
  init: function() {
    this._super();
    return this.updateValue();
  },
  updateDate: (function() {
    var ms;
    if (ms = Date.parse(this.get('value'))) {
      return this.set('date', new Date(ms));
    }
  }).observes('value'),
  updateValue: (function() {
    var date;
    if (this.get('hasFocus')) {
      return;
    }
    date = this.get('date');
    if (date instanceof Date) {
      return this.set('value', date.toISOString().substring(0, 10));
    }
  }).observes('date'),
  focusIn: function() {
    return this.set('hasFocus', true);
  },
  focusOut: function() {
    this.set('hasFocus', false);
    return this.updateValue();
  }
});


Ember.Handlebars.registerBoundHelper('date', function(date) {
  return moment(date).format('MMMM Do YYYY, h:mm:ss a');;
});
