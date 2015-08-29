var fs = require('fs');

module.exports = function($stateProvider, $urlRouterProvider) {
  //change this
  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('main', {
      url: '/main',
      template: fs.readFileSync(__dirname + '/views/main_view.html', 'utf-8')
    })
    .state('main.list', {
      url: '/list',
      template: fs.readFileSync(__dirname + '/views/list_view.html', 'utf-8'),
      controller: require('./controllers/list.controller.js')
    })
    .state('main.map', {
      url: '/map',
      template: fs.readFileSync(__dirname + '/views/map_view.html', 'utf-8'),
      controller: require('./controllers/map.controller.js')
    })
    ;
};
