angular.module('brevesApp').factory('Suggestions', ['$resource', function ($resource) {
  return $resource( '/api/v1/suggestions/:id',
                    { id: '@_id'}, // because of mongodb
                    { update: { method: 'PUT' } // force to use PUT
  });
}]);
