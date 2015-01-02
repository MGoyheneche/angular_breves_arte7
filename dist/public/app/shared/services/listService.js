// function ListFactory ($http) {
//   return $http.get('/api/v1/lists/b0e318dd95');
// };

// angular.module('brevesApp').factory('List', ListFactory);


// function ListFactory ($http) {
//   return $http.get('/api/v1/lists/b0e318dd95');
// }

angular.module('brevesApp').factory('List', ['$http', function ($http) {
  return $http.get('/api/v1/lists/b0e318dd95');
}]);
