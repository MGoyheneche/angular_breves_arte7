angular.module('brevesApp', ['ngRoute']);

function RouteConfig ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/components/home/homeView.html',
      controller: 'HomeCtrl'
    })
    .when('/suggestions', {
      templateUrl: 'app/components/suggestion/suggestionView.html',
      controller: 'SuggestionCtrl'
    })

    .otherwise('/home');
}

angular.module('brevesApp').config(RouteConfig);
