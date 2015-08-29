// @ngInject
module.exports = ['$http', '$q', function ($http, $q) {

  return {
    fetchTweets: function (users) {
      var params = "from:" + users.join(", OR from:");

      return $http.get('/api/getTweets', {params: {from: params}});
    }
  };
}];