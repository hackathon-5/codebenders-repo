require('angular');
require('angular-ui-router/release/angular-ui-router.min.js');
require('angular-ui-bootstrap');
var fs = require('fs');

angular.module('DisasterApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(require('./states.js'))
  .factory('disasterService', require('./services/disaster.service.js'))
  .run(function($templateCache) {
      $templateCache.put('markerModal_view.html', fs.readFileSync(__dirname + '/views/markerModal_view.html', 'utf-8') );
  });
  
