angular.module('brevesApp').factory('List', ['$http', function ($http) {
  return $http.get('/api/v1/lists/b0e318dd95');
}]);
