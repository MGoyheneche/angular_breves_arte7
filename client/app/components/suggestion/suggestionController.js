// function suggestionController ($scope, Suggestions) {
//   $scope.suggestions = Suggestions.query();
//   $scope.suggestion = new Suggestions();

//   // $scope.createSuggestion = function (suggestion) {
//     // var Suggestions = $resource('api/v1/suggestions/:id');
//     var suggestion = new Suggestions($scope.suggestion);
//     // suggestion.$save();
//   // }

// }

function createSuggestionController ($scope, $resource, Suggestions) {
  $scope.createSuggestion = function () {
    console.log($scope.suggestion);
    var suggestion = new Suggestions($scope.suggestion);
    suggestion.$save();
  };
};

// function showSuggestionsController ($scope, Suggestions) {
//   $scope.suggestions = Suggestions.query();

//   // $scope.voteForSuggestion = function (suggestionId) {
//     // var Suggestions = $resource('api/v1/suggestions/:id');
//     var suggestion = new Suggestions($scope.suggestion);
//     // suggestion.$save();
//   // }

// }

angular.module('brevesApp').controller('CreateSuggestionCtrl', createSuggestionController);
  // .controller('ShowSuggestionsCtrl', showSuggestionsController);
