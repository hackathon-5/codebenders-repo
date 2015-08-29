// @ngInject
module.exports = ['$http', '$q', function ($http, $q) {

  return {
    fetchTweets: function (query, users) {
      var params = query+"from:" + users.join(", OR from:");

      return $http.get('/api/getTweets', {params: {from: params}});
    },
    crimeTweets: function() {
      return $http.get('/api/getCrimeTweets');
    }
  };
}];