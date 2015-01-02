// function HomeController($scope, List) {
//   $scope.jobs = "jobs";
//   List.success(function(list){
//     $scope.list = list;
//   });
//   $scope.mandrill_email_limit = 4000; // Monthly limit of free email
// }

// angular.module('brevesApp').controller('HomeCtrl', HomeController);


// function HomeController($scope, List) {
//   $scope.jobs = "jobs";
//   List.success(function(list){
//     $scope.list = list;
//   });
//   $scope.mandrill_email_limit = 4000; // Monthly limit of free email
// }

angular.module('brevesApp').controller('HomeCtrl', ['$scope', '$timeout', '$location', 'List', function ($scope, $timeout, $location, List) {
  $scope.jobs = "jobs";
  List.success(function(list){
    $scope.list = list[0];
  });
  $scope.mandrill_email_limit = 4000; // Monthly limit of free email

  $scope.hasHash = function () {
    return $location.hash().length !== 0;
  }

  $scope.$on('$viewContentLoaded', function(){
    //Here your view content is fully loaded !!
    console.log(angular.element(document.querySelector( '#home' )));
    $timeout(function() {
      angular.element(document.querySelector( '#catch' )).removeClass('invisible');
    }, 400).then(
      $timeout(function() {
        angular.element(document.querySelector( '#browser' )).removeClass('invisible');
        angular.element(document.querySelector( '#over' )).removeClass('invisible');
      }, 1500)
    );
  });
}]);
