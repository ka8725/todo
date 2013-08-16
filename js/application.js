window.Todos = Ember.Application.create();


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
