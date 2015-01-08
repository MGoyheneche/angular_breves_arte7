angular.module('brevesApp').directive('brevesMail', [function() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/breves_mail/brevesMailView.html',
    controller: 'BrevesMailCtrl'
  };
}]);
