var _ = require('lodash');
var moment = require('moment');

module.exports = function ($scope, $q, DisasterTweets) {

  $scope.hurricane_users = ['twc_hurricane','NHC_Atlantic','nhc_pacific','NWSNHC','NHC_Surge','NHC_TAFB'];
  $scope.earthquake_users = ['usgsearthquakes','USGSted'];
// fire_users =
// flood_users = downtown charleston flooding
// disaster_users =
// tornado_users =

  $scope.loading = false;
  $scope.data = {
    tweets: []
  };

  $scope.getData = function () {
    $scope.loading = true;
    var dataFetchers = [];

    dataFetchers.push($scope.fetchDisasterTweets());

    $q.all(dataFetchers).then( function () {
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  };

  $scope.fetchDisasterTweets = function () {
    return DisasterTweets.fetchTweets($scope.hurricane_users).
      then(function (response) {
        _.each(response.data.statuses, function (res) {
          var tweet = _.pick(res,'created_at','text','user','geo','coordinates','place','entities');
          tweet.created_at = moment().toDate(res.created_at);
          if (tweet.entities.hashtags.length > 0) { tweet.entities.hashtags = _.uniq(res.entities.hashtags, 'text'); }
          $scope.data.tweets.push(tweet);
        });

      }).catch(function (err) {
        console.log(err);
      });
  };

  $scope.getData();

  $scope.bar = 'list';
};
