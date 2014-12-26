angular.module('brevesApp', ['ngRoute']);

function RouteConfig ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'app/components/home/home.view.html',
      controller: 'HomeCtrl'
      // resolve: {
      //   jobs: function(Job) {
      //     // TODO: research javascript promise
      //     return Job.query().$promise;
      //   }
      // }
    })

    .otherwise('/home');

  // $locationProvider
  //   .html5Mode(false);
}

angular.module('brevesApp').config(RouteConfig);
