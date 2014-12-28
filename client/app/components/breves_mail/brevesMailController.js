
function brevesMailController($scope, Movies) {
  Movies.success(function(data){
    $scope.movies = data;
  });
}

angular.module('brevesApp').controller('BrevesMailCtrl', brevesMailController);
