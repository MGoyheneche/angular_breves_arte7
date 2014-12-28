function navigationController($scope, $location) {
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  $scope.appName = "Brèves arte+7";
}

angular.module('brevesApp').controller('NavigationCtrl', navigationController);
