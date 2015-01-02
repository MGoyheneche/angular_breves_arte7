function navigationDirective() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/navigation/navigationView.html',
    controller: 'NavigationCtrl'
  };
}

angular.module('brevesApp').directive('navigationPrimary', navigationDirective);
