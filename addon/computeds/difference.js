import Ember from 'ember';

const { get } = Ember;

/**
  A computed property that returns the difference between two property keys.

  Example:

  ```javascript
  var ToDoList = Ember.Object.extend({
    total: Ember.computed.readOnly('todos.length'),
    withSubtasks: Ember.computed.filter('todos', (todo) => { return todo.get('hasSubtasks'); }),
    totalWithSubtasks: Ember.computed.readOnly('withSubtasks.length'),
    totalWithoutSubtasks: Ember.computed.difference('total', 'totalWithSubtasks'),
    differenceBetweenTotals: Ember.computed.difference('totalWithSubtasks', 'totalWithoutSubtasks', { absolute: true })
  });

  var todoList = ToDoList.create({
    todos: [
      { name: 'First task', hasSubtasks: true },
      { name: 'Second task', hasSubtasks: true },
      { name: 'Third task', hasSubtasks: false },
      { name: 'Fourth task', hasSubtasks: false }
      { name: 'Fifth task', hasSubtasks: false }
    ]
  });

  todoList.get('totalWithoutSubtasks'); // 3
  todoList.get('differenceBetweenTotals'); // 2
  ```

  @method difference
  @for Ember.computed
  @param {String} propertyKey1
  @param {String} propertyKey2
  @param {Object} options
  @return {Ember.ComputedProperty} computes the difference between propertyKey1 and propertyKey2
  @public
 */
function difference(propertyKey1, propertyKey2, options = {}) {
  options = Ember.$.extend({}, { absolute: false }, options);
  let prop2IsNumeric = !isNaN(parseFloat(propertyKey2)) && isFinite(propertyKey2);

  Ember.assert('propertyKey1 is required for Ember.computed.difference', propertyKey1 && propertyKey1.length > 0);
  Ember.assert('propertyKey2 is required for Ember.computed.difference', propertyKey2 && (propertyKey2.length > 0 || prop2IsNumeric));

  let differenceFunc = function() {
    let otherVal = prop2IsNumeric ? propertyKey2 : get(this, propertyKey2);
    let diff = get(this, propertyKey1) - otherVal;

    return options.absolute ?  Math.abs(diff) : diff;
  };

  let computed = prop2IsNumeric ? Ember.computed(propertyKey1, differenceFunc) : Ember.computed(propertyKey1, propertyKey2, differenceFunc);
  const args = prop2IsNumeric ? [propertyKey1] : [propertyKey1, propertyKey2];

  return computed.property.apply(computed, args);
}

export default difference;
