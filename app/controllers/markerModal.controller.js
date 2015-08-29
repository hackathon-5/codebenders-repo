module.exports = function($scope, $modalInstance, disaster) {
  $scope.disaster = disaster;
  // $scope.name = 'foo';
  // $scope.type = 'flood';
  // $scope.description = "Prolonged torrential rains caused a number of floods and mudslides between 11 and 13 May 2015 in Khatlon province and Hoit administrative center of the Rasht valley of Tajikistan. According to the rapid assessment results received from the Committee of Emergency Situations and Civil Defense and the Red Crescent Society of Tajikistan, 296 families (1,776 people) were severely affected. Most of the houses were heavily damaged and rendered unusable. Roads, bridges, schools, agricultural fields, family plots and four schools were also affected and destroyed. The affected population urgently needs shelter, food, hygiene and sanitation, drinking water and household appliances.";
  // $scope.location = "USA";
  // $scope.date = '08/23/2015';

  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
}
