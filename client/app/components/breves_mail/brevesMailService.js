// function MoviesFactory ($) {
//     console.log('hello from factory');
//     return {bonjour: "le monde"};
// }

function MoviesFactory ($http) {
  // console.log('hello from factory');
  return $http.get('/api/v1/movies/');
};

angular.module('brevesApp').factory('Movies', MoviesFactory);
