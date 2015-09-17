import Ember from 'ember';
import difference from 'ember-cp-difference/computeds/difference';

export default {
  name: 'difference',
  initialize() {
    Ember.computed.difference = difference;
  }
};
