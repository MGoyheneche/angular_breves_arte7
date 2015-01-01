angular.module('brevesApp', ['ngRoute', 'ngResource']);

function RouteConfig ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/components/home/homeView.html',
      controller: 'HomeCtrl'
    })
    .when('/suggestion', {
      templateUrl: 'app/components/suggestion/suggestionView.html',
      controller: 'SuggestionCtrl'
    })

    .otherwise('/');
}

angular.module('brevesApp').config(RouteConfig);


// TODO: moove into a Service, a directive ?
angular.module('brevesApp').run(function($rootScope, $timeout) {
  $rootScope.modalAlert = function(alert){
    console.log(alert);
    $rootScope.alert = alert;
    $timeout(function() {
      $rootScope.alert = {};
    }, alert.duration || 5000);
  }
});


// $(function(){
//   console.log($('a#hamburger-icon'));
//   $('a#hamburger-icon').on('click', function(e){
//     e.preventDefault();
//   console.log("helooooo")

//     console.log($('navigation-primary'));
//     $('navigation-primary').toggleClass('retracted');
//   });

//   $( "a" ).on( "click", function() {
//     alert( $( this ).text() );
//   });
// });
