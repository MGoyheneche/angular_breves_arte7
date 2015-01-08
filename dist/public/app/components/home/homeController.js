angular.module('brevesApp').controller('HomeCtrl', ['$scope', '$timeout', '$location', 'List', function ($scope, $timeout, $location, List) {

  $scope.mandrillEmailLimit = 4000 / 31; // Monthly limit of free email

  List.success(function(list){
    $scope.list = list.data[0];
    console.log($scope.list.stats.member_count);
    $scope.remainingPlace = Math.floor($scope.mandrillEmailLimit - $scope.list.stats.member_count);
  });

  $scope.hasHash = function () {
    return $location.hash().length !== 0;
  }

  $scope.$on('$viewContentLoaded', function(){
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
