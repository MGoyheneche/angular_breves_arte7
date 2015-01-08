angular.module('brevesApp', ['ngRoute', 'ngResource']);

angular.module('brevesApp').config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/homeView.html',
      controller: 'HomeCtrl'
    })
    .when('/subscribe', {
      templateUrl: 'app/components/subscribe/subscribeView.html'
    })
    .when('/unsubscribe', {
      templateUrl: 'app/components/unsubscribe/unsubscribeView.html',
    })
    .when('/suggestion', {
      templateUrl: 'app/components/suggestion/suggestionView.html',
      controller: 'SuggestionCtrl'
    })

    .otherwise('/');
}]);


// TODO: moove into a Service, a directive ?
angular.module('brevesApp').run(['$rootScope', '$timeout', '$location', 'scrollToNoReload', function($rootScope, $timeout, $location, scrollToNoReload) {
  $rootScope.modalAlert = function(alert){
    console.log(alert);
    $rootScope.alert = alert;
    $timeout(function() {
      $rootScope.alert = {};
    }, alert.duration || 5000);
  };

  $rootScope.gotoElement = function (eID){
    console.log($location.hash().length);
    scrollToNoReload.scrollTo(eID);
  };

}]);

