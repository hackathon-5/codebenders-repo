module.exports = function($http) {
  var getDisasters = function() {
    return $http.get('/api/disasters');
  };
  return {
    getDisasters: getDisasters
  };
};