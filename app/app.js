require('angular');
require('angular-ui-router/release/angular-ui-router.min.js');
angular.module('DisasterApp', ['ui.router'])
  .config(require('./states.js'));
