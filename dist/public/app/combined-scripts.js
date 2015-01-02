'use strict';

/* client/app/app.js */
(function(){

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
angular.module('brevesApp').run(function($rootScope, $timeout, $location) {
  $rootScope.modalAlert = function(alert){
    console.log(alert);
    $rootScope.alert = alert;
    $timeout(function() {
      $rootScope.alert = {};
    }, alert.duration || 5000);
  };

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


})();
/* client/app/components/breves_mail/brevesMailController.js */
(function(){


function brevesMailController($scope, Movies) {
  Movies.success(function(movies){
    $scope.movies = movies;
  });
}

angular.module('brevesApp').controller('BrevesMailCtrl', brevesMailController);


})();
/* client/app/components/breves_mail/brevesMailDirective.js */
(function(){

function brevesMailDirective() {
  return {
    restrict: 'E',
    templateUrl: 'app/components/breves_mail/brevesMailView.html',
    controller: 'BrevesMailCtrl'
  };
}

angular.module('brevesApp').directive('brevesMail', brevesMailDirective);


})();
/* client/app/components/home/homeController.js */
(function(){

function HomeController($scope, List) {
  $scope.jobs = "jobs";
  List.success(function(list){
    $scope.list = list;
  });
  $scope.mandrill_email_limit = 4000; // Monthly limit of free email
}

angular.module('brevesApp').controller('HomeCtrl', HomeController);


})();
/* client/app/components/suggestion/suggestionController.js */
(function(){

function SuggestionController ($scope, $http, Suggestions) {
  $scope.showAdditionalCreationFields = false;

  $scope.form = {}; // access to the form

  $scope.suggestions = Suggestions.query();
  // $scope.createSuggestionForm.submitted = false;

  $scope.filterFunction = function(element) {
    var re = new RegExp($scope.suggestion_filter, 'gi');
    return element.title.match(re) ? true : false;
  };

  $scope.createSuggestion = function () {
    // console.log(this) // Clean form validation
    console.log($scope.createSuggestion);
    // check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.createSuggestion.creatorEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          $scope.modalAlert({
            type: "error",
            message: "Seuls les personnes déjà inscrites à la newsletter peutvent proposer une suggestion."
          });
        } else {
          $scope.form.createSuggestionForm.$setUntouched(); // Clean form validation
          $scope.createSuggestion.voting = [];
          $scope.createSuggestion.voting.push($scope.createSuggestion.creatorEmail);
          var newSuggestion = new Suggestions($scope.createSuggestion);
          console.log(newSuggestion);
          newSuggestion
          newSuggestion.$save();
          $scope.suggestions.push(newSuggestion);
          $scope.createSuggestion = {};
          $scope.showAdditionalCreationFields = false;
          $scope.modalAlert({
            type: "success",
            message: "Votre suggestion a été ajoutée."
          });
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error");
        $scope.modalAlert({
          type: "error",
          message: "Une erreur s'est produite. Veuillez recommencer."
        });
      });
  };


//   $scope.voteForSuggestion = function (index) {
//     // console.log($scope.suggestions[index]);
//     if (!$scope.suggestions[index].votingEmail) {
//       console.log("email invalide");
//       return;
//     }

//     if ($scope.suggestions[index].voting.indexOf($scope.suggestions[index].votingEmail) !== -1) {
//       console.log("Vous avez deja voté");
//       $scope.modalAlert({
//         type: "error",
//         message: "Vous avez déjà voté. C'est pas bien de tricher."
//       });
//       return;
//     }

//     // Check if email is registered in a list
//     $http
//       .get('api/v1/helper/lists-for-email/' + $scope.suggestions[index].votingEmail)
//       .success(function(data, status, headers, config) {
//         if (data.status === "error") {
//           console.log("not a member");
//           $scope.modalAlert({
//             type: "error",
//             message: "Seuls les personnes déjà inscrites à la newsletter peutvent voter pour une suggestion."
//           });
//         } else {
//           $scope.suggestions[index].voting.push($scope.suggestions[index].votingEmail);
//           var suggestion = new Suggestions($scope.suggestions[index]);
//           suggestion.voteCount++;
//           suggestion.$update(function(data){
//             $scope.suggestions[index].voteCount++;
//           }, function(err){
//             console.log('update request failed');
//           });
//         }
//       })
//       .error(function(data, status, headers, config) {
//         console.log("Api error")
//       });
//   };
// }

 $scope.voteForSuggestion = function (_id) {

    console.log(_id);
    // Find the if in $scope.suggestions array
    var index = $.map($scope.suggestions, function(obj, index) {
      if(obj._id == _id)
        return index;
    })[0];
    console.log($scope.suggestions[index]);
    // return;
    if (!$scope.suggestions[index].votingEmail) { //if undifined
      console.log("email invalide (undefined)");
      return;
    }

    if ($scope.suggestions[index].voting.indexOf($scope.suggestions[index].votingEmail) !== -1) {
      console.log("Vous avez deja voté");
      $scope.modalAlert({
        type: "error",
        message: "Vous avez déjà voté. C'est pas bien de tricher."
      });
      return;
    }

    // Check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.suggestions[index].votingEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          console.log("not a member");
          $scope.modalAlert({
            type: "error",
            message: "Seuls les personnes déjà inscrites à la newsletter peuvent voter pour une suggestion."
          });
        } else {
          $scope.suggestions[index].voting.push($scope.suggestions[index].votingEmail);
          var suggestion = new Suggestions($scope.suggestions[index]);
          suggestion.voteCount++;
          suggestion.$update(function(data){
            $scope.suggestions[index].voteCount++;
            $scope.modalAlert({
              type: "success",
              message: "Votre vote a bien été pris en compte"
            });
          }, function(err){
            console.log('update request failed');
            $scope.modalAlert({
              type: "error",
              message: "Une erreur s'est produite, veuillez re-voter s'il vous plait."
            });
          });
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error");
        $scope.modalAlert({
          type: "error",
          message: "Une erreur s'est produite, veuillez vérifier votre adresse email et voter à nouveau."
        });
      });
  };
}


angular.module('brevesApp').controller('SuggestionCtrl', SuggestionController)













// function createSuggestionController ($scope, $http, Suggestions) {
//   $scope.createSuggestion = function () {
//     // check if user can create a suggestion
//     $http
//       .get('api/v1/helper/lists-for-email/' + $scope.suggestion.creatorEmail)
//       .success(function(data, status, headers, config) {
//         if (data.status === "error") {
//           console.log("error in the mail")
//         } else {
//           var suggestion = new Suggestions($scope.suggestion);
//           suggestion.$save();
//           $scope.suggestions = $scope.suggestions || [];
//           $scope.suggestions.push(suggestion);
//         }
//       })
//       .error(function(data, status, headers, config) {
//         // called asynchronously if an error occurs
//         console.log("Api error")
//       });
//   };
// };

// function showSuggestionsController ($scope, Suggestions) {
//   $scope.suggestions = Suggestions.query();

//   $scope.voteForSuggestion = function (index) {
//     // console.log(index);
//     // var sug = $scope.suggestions[index];
//     // Check if email can create a suggestion
//     var suggestion = new Suggestions($scope.suggestions[index]);
//     suggestion.$update( function(data){
//       // console.log('success, got data: ', data);
//       $scope.suggestions[index].voteCount++;
//     }, function(err){
//       alert('request failed');
//     });
//   };

// }

// angular.module('brevesApp')
//   .controller('CreateSuggestionCtrl', createSuggestionController)
//   .controller('ShowSuggestionsCtrl', showSuggestionsController);


})();
/* client/app/shared/directives/scrollToDirective.js */
(function(){

angular.module('brevesApp').directive('scrollTo', function() {
  return {
    restrict: 'A',
    link: function(scope, $element, attrs) {
      var idToScroll = attrs.href;
      $element.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $element;
        }
        $("body").animate({
          scrollTop: $target.offset().top - $('nav.navbar').height()
        }, "slow");
      });
    }
  }
});


})();
/* client/app/shared/filters/iso8601Period.js */
(function(){

function iso8601PeriodFilter () {
  return function(input) {
    var match = input.match(/(\d*)M(\d*)S/);
    return match[1] + ' min';
  };
}

angular.module('brevesApp').filter('iso8601Period', iso8601PeriodFilter);


})();
/* client/app/shared/navigation/navigationController.js */
(function(){

function navigationController($scope, $location) {
  $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
  };
  $scope.appName = "Brèves arte+7";
  $scope.retracted = true;
  $scope.toogleNav = function () {
    console.log($scope.retracted)
    $scope.retracted = $scope.retracted ? false : true;
  }
}

angular.module('brevesApp').controller('NavigationCtrl', navigationController);


})();
/* client/app/shared/navigation/navigationDirective.js */
(function(){

function navigationDirective() {
  return {
    restrict: 'E',
    templateUrl: 'app/shared/navigation/navigationView.html',
    controller: 'NavigationCtrl'
  };
}

angular.module('brevesApp').directive('navigationPrimary', navigationDirective);


})();
/* client/app/shared/services/alertService.js */
(function(){

// function AlertFactory ($rootScope){

//    return {
//       create: function(alert){
//                 console.log(alert);
//                 $rootScope.alert = alert;
//               }
//    }
// };

// angular.module('brevesApp').factory('alertFactory', AlertFactory);



})();
/* client/app/shared/services/helperService.js */
(function(){

// function Factory ($http) {
//   return $http.get('/api/v1/lists/b0e318dd95');
// };

// angular.module('brevesApp').factory('List', ListFactory);


})();
/* client/app/shared/services/listService.js */
(function(){

function ListFactory ($http) {
  return $http.get('/api/v1/lists/b0e318dd95');
};

angular.module('brevesApp').factory('List', ListFactory);


})();
/* client/app/shared/services/movieService.js */
(function(){

function MoviesFactory ($http) {
  return $http.get('/api/v1/movies/');
};

angular.module('brevesApp').factory('Movies', MoviesFactory);


})();
/* client/app/shared/services/suggestionService.js */
(function(){

function SuggestionsFactory ($resource) {
  return $resource( '/api/v1/suggestions/:id',
                    { id: '@_id'},
                    { update: { method: 'PUT' }
  });
};

angular.module('brevesApp').factory('Suggestions', SuggestionsFactory);


})();
/* client/app/shared/subscribe_form/subscribeFormController.js */
(function(){

function subscribeFormController ($scope, $http, $rootScope) {

  $scope.subscribeToList = function () {
    console.log($scope.subscriber.email);

    $http.post('/api/v1/lists/subscribe', {id: 'b0e318dd95', email: $scope.subscriber.email}).success(function(data, status, headers, config) {
        console.log("Tout va bien");

        $scope.modalAlert({
          type: "success",
          message: "Votre demande à bien été prise en compte, un email vous à été envoyé."
        });
      }).error(function(data, status, headers, config) {
        $scope.modalAlert({
          type: "error",
          message: data
        });
        console.log(data);
      });
  }

}

angular.module('brevesApp').controller('SubscribeFormController', subscribeFormController)



})();