module.exports = function($scope, $modalInstance) {

  $scope.close = function () {
    $modalInstance.dismiss('cancel');
  };
}
