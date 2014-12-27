function navigationController($scope, $location) {
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  $scope.popo = "popopopo";
}

angular.module('brevesApp').controller('NavigationCtrl', navigationController);
