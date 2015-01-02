// function brevesMailController($scope, Movies) {
//   Movies.success(function(movies){
//     $scope.movies = movies;
//   });
// }

// angular.module('brevesApp').controller('BrevesMailCtrl', brevesMailController);



// function brevesMailController($scope, Movies) {
//   Movies.success(function(movies){
//     $scope.movies = movies;
//   });
// }

angular.module('brevesApp').controller('BrevesMailCtrl', ['$scope', 'Movies', function ($scope, Movies) {
  Movies.success(function(movies){
    $scope.movies = movies;
  });
}]);
