var fs = require('fs');

module.exports = function($scope, $modal, $templateCache) {
  
  
   $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };

   getEvents = function() {

   }

   // earthquake
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png

   // fire
   // http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png

   // flood
   // http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png

   // tornado
   // http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png

  $scope.clickMarker = function() {
    $modal.open({
      controller: require('./markerModal.controller.js'),
      template: $templateCache.get('markerModal_view.html'),
      resolve: {
        items: function () {
          return $scope.markers;
        }
      }
    })
  }

  // need a way to fetch markers via api or whatevs




   $scope.markers = [{
      // this can be html link
      id: 0,
      coords: {
        // want to read these in from api service
        latitude: 18.85,
        longitude: -70.11
      },
      options: {
        draggable: false,
        icon: {
          // fire
          url: 'http://i572.photobucket.com/albums/ss164/sofidius/inside%20the%20fire/50px-Fire-icon-1.png'
        },
      }
    },
    {
      
      id: 1,
      coords: {
        latitude: 42.1451,
        longitude: -99.6680
      },
      options: { 
        draggable: false,
        icon: {
          // tornado
          url: 'http://icons.iconarchive.com/icons/icons8/windows-8/24/Weather-Tornado-icon.png'
        },
      },
    },
    {
      // this can be html link
      id: 2,
      coords: {
        // want to read these in from api service
        latitude: 32.1451,
        longitude: -95.6680
      },
      options: { 
        draggable: false,
        icon: {
          // flood
          url: 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Floods-icon.png'
        },
      },
      title: 'foo'
      
    },
    {
      // this can be html link
      id: 3,
      coords: {
        // want to read these in from api service
        latitude: 35.1451,
        longitude: -99.6680
      },
      options: { 
        draggable: false,
        icon: {
          //earth quake
          url: 'http://icons.iconarchive.com/icons/icons8/ios7/24/Weather-Earthquakes-icon.png'
        },
      },
      title: 'foo'
      
    },];
};