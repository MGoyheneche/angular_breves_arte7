function MoviesFactory ($http) {
  return $http.get('/api/v1/movies/');
};

angular.module('brevesApp').factory('Movies', MoviesFactory);
