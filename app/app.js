require('angular');
require('angular-ui-router/release/angular-ui-router.min.js');

angular.module('DisasterApp', ['ui.router', 'uiGmapgoogle-maps'])
  .config(require('./states.js'));
