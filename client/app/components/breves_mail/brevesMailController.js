angular.module('brevesApp').controller('BrevesMailCtrl', ['$scope', 'Movies', function ($scope, Movies) {
  Movies.success(function(movies){
    $scope.movies = movies;
  });
}]);
