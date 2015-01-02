angular.module('brevesApp', ['ngRoute', 'ngResource']);

function RouteConfig ($routeProvider) {
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
}

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


// angular.module('brevesApp', ['ngRoute', 'ngResource']);

// function RouteConfig ($routeProvider) {
//   $routeProvider
//     .when('/', {
//       templateUrl: 'app/components/home/homeView.html',
//       controller: 'HomeCtrl'
//     })
//     .when('/subscribe', {
//       templateUrl: 'app/components/subscribe/subscribeView.html'
//     })
//     .when('/unsubscribe', {
//       templateUrl: 'app/components/unsubscribe/unsubscribeView.html',
//     })
//     .when('/suggestion', {
//       templateUrl: 'app/components/suggestion/suggestionView.html',
//       controller: 'SuggestionCtrl'
//     })

//     .otherwise('/');
// }

// angular.module('brevesApp').config(RouteConfig);



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
    // set the location.hash to the id of
    // the element you wish to scroll to.
    // $location.hash(eID);
    console.log($location.hash().length);
    // $location.path("/thing/").replace().reload(false);

    // call $anchorScroll()
    scrollToNoReload.scrollTo(eID);

  };
  // $rootScope.firstLoading = true;

  // if ($rootScope.firstLoading) {

  //   angular.element(document.querySelector( '#catch' )).addClass('invisible');
  //   angular.element(document.querySelector( '#browser' )).addClass('invisible');
  //   angular.element(document.querySelector( '#over' )).addClass('invisible');
  // };

  // $rootScope.gotoAnchor = function(hash) {
  //   if ($location.hash() !== hash) {
  //     // set the $location.hash to `newHash` and
  //     // $anchorScroll will automatically scroll to it
  //     console.log("hello");
  //     $location.hash(hash);
  //   } else {
  //     // call $anchorScroll() explicitly,
  //     // since $location.hash hasn't changed
  //     $anchorScroll();
  //   }
  // };
}]);


// $(function(){
//   console.log($('div#home div.catch'));
//   $('div#home div.catch').removeClass('invisible');
  // $('a#hamburger-icon').on('click', function(e){
  //   e.preventDefault();
  // console.log("helooooo")

  //   console.log($('navigation-primary'));
  //   $('navigation-primary').toggleClass('retracted');
  // });

  // $( "a" ).on( "click", function() {
  //   alert( $( this ).text() );
  // });
// });
