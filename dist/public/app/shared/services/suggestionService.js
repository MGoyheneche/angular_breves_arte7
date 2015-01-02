function SuggestionsFactory ($resource) {
  return $resource( '/api/v1/suggestions/:id',
                    { id: '@_id'},
                    { update: { method: 'PUT' }
  });
};

angular.module('brevesApp').factory('Suggestions', SuggestionsFactory);
