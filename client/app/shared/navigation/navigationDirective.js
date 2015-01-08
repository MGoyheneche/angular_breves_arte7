angular.module('brevesApp').directive('navigationPrimary', [ function () {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/navigation/navigationView.html',
    controller: 'NavigationCtrl'
  };
}]);
