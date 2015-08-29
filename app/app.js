require('angular');
require('angular-ui-router/release/angular-ui-router.min.js');
require('angular-ui-bootstrap');

angular.module('DisasterApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(require('./states.js'));
