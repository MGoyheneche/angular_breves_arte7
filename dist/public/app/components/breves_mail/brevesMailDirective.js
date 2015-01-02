function brevesMailDirective() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/breves_mail/brevesMailView.html',
    controller: 'BrevesMailCtrl'
  };
}

angular.module('brevesApp').directive('brevesMail', brevesMailDirective);
