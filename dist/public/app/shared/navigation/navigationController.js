function navigationController($scope, $location) {
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  $scope.appName = "Brèves arte+7";
  $scope.retracted = true;
  $scope.toogleNav = function () {
    console.log($scope.retracted)
    $scope.retracted = $scope.retracted ? false : true;
  }
}

angular.module('brevesApp').controller('NavigationCtrl', navigationController);
