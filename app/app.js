require('angular');
require('angularfire');
require('angular-ui-router/release/angular-ui-router.min.js');
require('angular-ui-bootstrap');
var fs = require('fs');

angular.module('DisasterApp', ['ui.router', 'ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(require('./states.js'))
  .run(function($templateCache) {
      $templateCache.put('markerModal_view.html', fs.readFileSync(__dirname + '/views/markerModal_view.html', 'utf-8') );
  });
  
