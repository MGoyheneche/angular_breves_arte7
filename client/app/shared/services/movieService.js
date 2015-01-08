angular.module('brevesApp').factory('Movies', ['$http', function ($http) {
  return $http.get('/api/v1/movies/');
}]);
