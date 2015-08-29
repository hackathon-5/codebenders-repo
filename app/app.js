require('angular');
require('angular-ui-router/release/angular-ui-router.min.js');
angular.module('DisasterApp', ['ui.router'])
  .config(require('./states.js'))
  .factory('DisasterTweets', require('./services/twitter.service'))
  .filter('capitalize', function() {
    return function(input, all) {
      return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
    };
  });