var _ = require('lodash');
var moment = require('moment');

module.exports = function ($scope, $q, DisasterTweets) {

  $scope.loading = false;

  $scope.disasters = [
    {"type": "hurricane", "selected": true, "users": ["twc_hurricane","NHC_Atlantic","NHC_Pacific","NHC_Surge"]},
    {"type": "earthquake", "selected": true, "users": ["USGSBigQuakes","USGSEarthquakes","USGSted","EQTW","NewEarthquake"]},
    {"type": "wildfire", "selected": true, "users": ["wildfiretoday","pnw2","BCGovFireInfo","wildlandfirecom"]},
    {"type": "flood", "selected": true, "users": ["FloodAlerts"]},
    {"type": "tornado", "selected": true, "users": ["NWStornado","TWCBreaking","WarnTornado"]},
    {"type": "tsunami", "selected": true, "users": ["Pacific","NWS_NTWC","NWS_PTWC","tsunamiwatch","EQTW","NewEarthquake"]}
  ];

  $scope.users = {
    disaster_users: ["Disaster_Center"],
    weather_users: ["wunderground","weatherchannel","NWS"],
    location_users: ["LAFD",
      "dunedinflood","kawarauflood","upperclutha","lowerclutha","taierifloodinfo","northotagoflood","ORCFloodInfo",
      "NWSCharlestonSC"]
  };

  $scope.data = {
    events: [],
    tweets: []
  };

  $scope.getData = function () {
    $scope.data.events = [];
    $scope.data.tweets = [];
    $scope.loading = true;
    var dataFetchers = [];

    dataFetchers.push($scope.fetchDisasterTweets($scope.users.disaster_users, 'general'));

    _.each($scope.disasters, function (d) {
      if (d.selected === true) {
        dataFetchers.push($scope.fetchDisasterTweets(d.users, d.type));
      }
    });

    $q.all(dataFetchers).then( function () {
      $scope.data.tweets = _.sortBy($scope.data.tweets, 'created_at').reverse();
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  };

  $scope.fetchDisasterTweets = function (users, type) {
    return DisasterTweets.fetchTweets(users).
      then(function (response) {
        _.each(response.data.statuses, function (res) {
          var tweet = _.pick(res,'created_at','text','user','geo','coordinates','place','entities');

          tweet.created_at = moment(res.created_at).format('MMM D, YYYY h:mm a');
          if (tweet.entities.hashtags.length > 0) { tweet.entities.hashtags = _.uniq(res.entities.hashtags, 'text'); }
          tweet.type = type;

          $scope.data.tweets.push(tweet);
        });

        var events = _.map(response, function (res) {
          return {
            "name": angular.isDefined(res.entities) && angular.isDefined(res.entities.hashtags) && !angular.equals(res.entities.hashtags,[]) ? res.entities.hashtags[0].text : type,
            "description": res.text,
            "date": moment(res.created_at),
            "type": type,
            "location": {
              "lat": angular.isDefined(res.coordinates) && angular.isDefined(res.coordinates.coordinates) ? res.coordinates.coordinates[1] : null,
              "long": angular.isDefined(res.coordinates) && angular.isDefined(res.coordinates.coordinates) ? res.coordinates.coordinates[0] : null
            }
          };
        });
        $scope.data.events.push(event);

      }).catch(function (err) {
        console.log(err);
      });
  };

  $scope.getData();
};
