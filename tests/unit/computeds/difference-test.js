import Ember from 'ember';
import difference from 'ember-cp-difference/computeds/difference';

module('difference', {
});


function createSubject(props) {
  return Ember.Object.extend(Ember.merge({}, props)).create();
}

test('Calculate the difference between two properties', function(assert) {
  assert.expect(1);

  let subject = createSubject({
    total: 100,
    totalWithHats: 20,
    totalWithoutHats: difference('total', 'totalWithHats')
  });

  assert.equal(subject.get('totalWithoutHats'), 80, 'Should calculate the difference between total and totalWithHats');
});

test('Calculates the absolute difference between two properties', function(assert) {
  assert.expect(1);

  let subject = createSubject({
    total: 100,
    totalWithHats: 20,
    totalWithoutHats: difference('totalWithHats', 'total', { absolute: true })
  });

  assert.equal(subject.get('totalWithoutHats'), 80, 'Should calculate the absolute difference between total and totalWithHats');
});

test('Calculates the negative difference between two properties by default', function(assert) {
  assert.expect(1);

  let subject = createSubject({
    total: 100,
    totalWithHats: 20,
    totalWithoutHats: difference('totalWithHats', 'total')
  });

  assert.equal(subject.get('totalWithoutHats'), -80, 'Should calculate the negative difference between total and totalWithHats');
});

test('Calculates the negative difference between two properties explicity', function(assert) {
  assert.expect(1);

  let subject = createSubject({
    total: 100,
    totalWithHats: 20,
    totalWithoutHats: difference('totalWithHats', 'total', { absolute: false })
  });

  assert.equal(subject.get('totalWithoutHats'), -80, 'Should calculate the negative difference between total and totalWithHats');
});
