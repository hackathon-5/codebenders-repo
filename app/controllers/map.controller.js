var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var rn = require('random-number');
var gen = rn.generator({min: -.1, max: .1 });
var moment = require('moment');

module.exports = function($scope, $q, $modal, $templateCache, disasterService, DisasterTweets) {

  $scope.loading = false;

  $scope.disasters = [
    {"type": "hurricane", "selected": true, "users": ["twc_hurricane","NHC_Atlantic","NHC_Pacific","NHC_Surge"]},
    {"type": "volcano", "selected": true, "users": []},
    {"type": "wild fire", "selected": true, "users": ["wildfiretoday","pnw2","BCGovFireInfo","wildlandfirecom"]},
    {"type": "cold wave", "selected": true, "users": []},
    {"type": "flood", "selected": true, "users": ["FloodAlerts"]},
    {"type": "earthquake", "selected": true, "users": ["USGSBigQuakes","USGSEarthquakes","USGSted","EQTW","NewEarthquake"]},
    {"type": "severe storm", "selected": true, "users": []},
    {"type": "tornado", "selected": true, "users": ["NWStornado","TWCBreaking","WarnTornado"]},
    {"type": "tsunami", "selected": true, "users": ["Pacific","NWS_NTWC","NWS_PTWC","tsunamiwatch","EQTW","NewEarthquake"]},
    {"type": "generic disaster", "selected": true, "users": ["Disaster_Center"]}
  ];

  // $scope.users = {
  //   weather_users: ["wunderground","weatherchannel","NWS"],
  //   location_users: ["LAFD",
  //     "dunedinflood","kawarauflood","upperclutha","lowerclutha","taierifloodinfo","northotagoflood","ORCFloodInfo",
  //     "NWSCharlestonSC"]
  // };

  $scope.data = {
    events: [],
    tweets: []
  };

  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

  function getIcon(type) {
    if (type.code === 'TC' || type.code === 'hurricane') {
      return 'http://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/32/Hurricane-icon.png';
    } else if (type.code === 'VO' || type.code === 'volcano') {
      return 'http://i.imgur.com/zBtppsH.png';
    } else if (type.code === 'WF' || type.code === 'wild fire') {
      return 'http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png';
    } else if (type.code === 'CW' || type.code === 'cold wave') {
      return 'http://icons.iconarchive.com/icons/icons8/christmas-flat-color/48/snowflake-icon.png';
    } else if (type.code === ('FL' || 'FF') || type.code === 'flood') {
      return 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png';
    } else if (type.code === 'EQ' || type.code === 'earthquake') {
      return 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png';
    } else if (type.code === 'ST' || type.code === 'severe storm') {
      return 'http://icons.iconarchive.com/icons/icons8/windows-8/48/Weather-Storm-icon.png';
    } else if (type == 'tornado') {
      return "http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png";
    } else {
      return 'http://icons.iconarchive.com/icons/aha-soft/free-3d-glossy/48/Disaster-Bolt-icon.png';
    }
  }

  function getType(type) {
    if (type.code === 'TC') {
      return 'hurricane';
    } else if (type.code === 'VO') {
      return 'volcano';
    } else if (type.code === 'WF') {
      return 'wild fire';
    } else if (type.code === 'CW') {
      return 'cold wave';
    } else if (type.code === ('FL' || 'FF')) {
      return 'flood';
    } else if (type.code === 'EQ') {
      return "earthquake";
    } else if (type.code === 'ST') {
      return 'severe storm';
    } else {
      return 'generic disaster';
    }
  }

  $scope.getDisasters = function () {
    return disasterService.getDisasters().then(function (res) {
      $scope.markers = _.chain(res.data)
        .filter(function(x) {
          return moment(x.date).isAfter('2015-01-01');
        })
        .filter(function (disaster) {
          return _.result(_.findWhere($scope.disasters, { 'type': getType(disaster.type) }), 'selected') === true ? true : false;
        })
        .map(function (disaster, i) {
          return {
            id: i,
            coords: {
              latitude: parseInt(disaster.location.lat, 10) + gen(),
              longitude: parseInt(disaster.location.long, 10) + gen()
            },
            options: {
              dragable: false,
              icon: {
                url: getIcon(disaster.type)
              }
            },
            data:  {
              name: disaster.name,
              type: getType(disaster.type),
              description: disaster.description,
              location: disaster.location.country,
              date: disaster.date
            }
          };
        })
        .value();
    });
  };

   // earthquake
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png

   // fire
   // http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png

   // flood
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png

   // tornado
   // http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png

  $scope.clickMarker = function(marker) {
    $modal.open({
      controller: require('./markerModal.controller.js'),
      template: $templateCache.get('markerModal_view.html'),
      size: 'lg',
      resolve: {
        disaster: function () {
          return marker;
        }
      }
    });
  };

  $scope.getData = function (query) {
    if (query === null) { query=""; }

    $scope.data.events = [];
    $scope.data.tweets = [];
    $scope.loading = true;
    var dataFetchers = [];

    dataFetchers.push($scope.getDisasters());

    _.each($scope.disasters, function (d) {
      if (d.selected === true && !angular.equals(d.users,[])) {
        dataFetchers.push($scope.fetchDisasterTweets(query, d.users, d.type));
      }
    });

    $q.all(dataFetchers).then( function () {
      $scope.data.tweets = _.sortBy($scope.data.tweets, 'created_at').reverse();
      $scope.loading = false;
    }, function () {
      $scope.loading = false;
    });
  };

  $scope.fetchDisasterTweets = function (query, users, type) {
    return DisasterTweets.fetchTweets(query, users).
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

  // $scope.$watchGroup(disasters, function(n, o) {
  //   console.log("n:", n);
  //   console.log("o:", o);
  //   if(n != o) {
  //     console.log("something changed:");
  //     $scope.getData();
  //   }
  // });
};