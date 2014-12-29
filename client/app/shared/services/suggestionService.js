function SuggestionsFactory ($resource) {
  return $resource('/api/v1/suggestions/:id', {id: '@id'});
};

angular.module('brevesApp').factory('Suggestions', SuggestionsFactory);
