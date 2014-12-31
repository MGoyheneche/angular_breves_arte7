function createSuggestionController ($scope, $resource, Suggestions) {
  $scope.createSuggestion = function () {
    console.log($scope.suggestion);
    var suggestion = new Suggestions($scope.suggestion);
    suggestion.$save();
  };
};

function showSuggestionsController ($scope, Suggestions) {
  $scope.suggestions = Suggestions.query();

  $scope.voteForSuggestion = function (index) {
    // console.log(index);
    // var sug = $scope.suggestions[index];
    var suggestion = new Suggestions($scope.suggestions[index]);
    suggestion.$update( function(data){
      // console.log('success, got data: ', data);
      $scope.suggestions[index].voteCount++;
    }, function(err){
      alert('request failed');
    });
  };

}

angular.module('brevesApp')
  .controller('CreateSuggestionCtrl', createSuggestionController)
  .controller('ShowSuggestionsCtrl', showSuggestionsController);
