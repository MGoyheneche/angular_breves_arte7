// function MoviesFactory ($http) {
//   return $http.get('/api/v1/movies/');
// };

// angular.module('brevesApp').factory('Movies', MoviesFactory);

// function MoviesFactory ($http) {
//   return $http.get('/api/v1/movies/');
// }

angular.module('brevesApp').factory('Movies', ['$http', function ($http) {
  return $http.get('/api/v1/movies/');
}]);
