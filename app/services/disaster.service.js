module.exports = function($http) {
  var getDisasters = function() {
    return $http.get('/api/disaster');
  };
  return {
    getDisasters: getDisasters
  };
};