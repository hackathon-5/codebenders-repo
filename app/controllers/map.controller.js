var fs = require('fs');
var _ = require('lodash');
var rn = require('random-number');
var gen = rn.generator({min: -10, max: 10 });

module.exports = function($scope, $modal, $templateCache, disasterService) {
  
  
   $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

  function getIcon(type) {
    if (type.code === 'TC') {
      return 'http://icons.iconarchive.com/icons/custom-icon-design/lovely-weather-2/32/Hurricane-icon.png';
    } else if (type.code === 'VO') {
      return 'http://i.imgur.com/zBtppsH.png';
    } else if (type.code === 'CW') {
      return 'http://icons.iconarchive.com/icons/icons8/christmas-flat-color/48/snowflake-icon.png';
    } else if (type.code === ('FL' || 'FF')) {
      return 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png';
    } else if (type.code === 'ST') {
      return 'http://icons.iconarchive.com/icons/icons8/windows-8/48/Weather-Storm-icon.png'
    } else {
      return 'http://icons.iconarchive.com/icons/aha-soft/free-3d-glossy/48/Disaster-Bolt-icon.png'
    }

  }

  function getType(type) {
    if (type.code === 'TC') {
      return 'Hurricane';
    } else if (type.code === 'VO') {
      return 'Volcano';
    } else if (type.code === 'CW') {
      return 'Cold Wave';
    } else if (type.code === ('FL' || 'FF')) {
      return 'Flood';
    } else if (type.code === 'ST') {
      return 'Severe Storm'
    } else {
      return 'Generic Disaster'
    } 
  }

  disasterService.getDisasters().then(function(res) {
    console.log("res.data:", res.data);
    $scope.markers = _.chain(res.data)
      .map(function(disaster, i) {
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
        }
      })
      .value();

      // $scope.name = 'foo';
      // $scope.type = 'flood';
      // $scope.description = "Prolonged torrential rains caused a number of floods and mudslides between 11 and 13 May 2015 in Khatlon province and Hoit administrative center of the Rasht valley of Tajikistan. According to the rapid assessment results received from the Committee of Emergency Situations and Civil Defense and the Red Crescent Society of Tajikistan, 296 families (1,776 people) were severely affected. Most of the houses were heavily damaged and rendered unusable. Roads, bridges, schools, agricultural fields, family plots and four schools were also affected and destroyed. The affected population urgently needs shelter, food, hygiene and sanitation, drinking water and household appliances.";
      // $scope.location = "USA";
      // $scope.date = '08/23/2015';  
    console.log("$scope.markers:", $scope.markers);

  });

   // earthquake
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png

   // fire
   // http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png

   // flood
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png

   // tornado
   // http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png

  $scope.clickMarker = function(marker) {
    console.log("marker:", marker);
    $modal.open({
      controller: require('./markerModal.controller.js'),
      template: $templateCache.get('markerModal_view.html'),
      resolve: {
        disaster: function () {
          return marker;
        }
      }
    })
  }

  // need a way to fetch markers via api or whatevs




   // $scope.markers = [{
   //    // this can be html link
   //    id: 0,
   //    coords: {
   //      // want to read these in from api service
   //      latitude: 18.85,
   //      longitude: -70.11
   //    },
   //    options: {
   //      draggable: false,
   //      icon: {
   //        // fire
   //        url: 'http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png'
   //      },
   //    }
   //  },
   //  {
      
   //    id: 1,
   //    coords: {
   //      latitude: 42.1451,
   //      longitude: -99.6680
   //    },
   //    options: { 
   //      draggable: false,
   //      icon: {
   //        // tornado
   //        url: 'http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png'
   //      },
   //    },
   //  },
   //  {
   //    // this can be html link
   //    id: 2,
   //    coords: {
   //      // want to read these in from api service
   //      latitude: 32.1451,
   //      longitude: -95.6680
   //    },
   //    options: { 
   //      draggable: false,
   //      icon: {
   //        // flood
   //        url: 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png'
   //      },
   //    },
   //    title: 'foo'
      
   //  },
   //  {
   //    // this can be html link
   //    id: 3,
   //    coords: {
   //      // want to read these in from api service
   //      latitude: 35.1451,
   //      longitude: -99.6680
   //    },
   //    options: { 
   //      draggable: false,
   //      icon: {
   //        //earth quake
   //        url: 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png'
   //      },
   //    },
   //    title: 'foo'
      
   //  },];
};