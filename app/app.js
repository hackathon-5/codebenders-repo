require('angular');
require('angularfire');
require('angular-ui-router/release/angular-ui-router.min.js');

angular.module('DisasterApp', ['ui.router', 'firebase'])
  .factory('dataService', require('./services/data.service'))
  .config(require('./states.js'));
