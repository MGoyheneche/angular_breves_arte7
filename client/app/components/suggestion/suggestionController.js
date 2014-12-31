function createSuggestionController ($scope, $http, Suggestions) {

  $scope.suggestions = Suggestions.query();

  console.log($scope.suggestions);

  $scope.createSuggestion = function () {
    // check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.suggestion.creatorEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          console.log("error in the mail")
        } else {
          $scope.suggestion.voting = [];
          $scope.suggestion.voting.push($scope.suggestion.creatorEmail);
          var suggestion = new Suggestions($scope.suggestion);
          console.log(suggestion);
          suggestion
          suggestion.$save();
          $scope.suggestions.push(suggestion);
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error")
      });
  };

  $scope.voteForSuggestion = function (index) {
    $scope.suggestions[index].voting.push($scope.suggestions[index].email);

    var suggestion = new Suggestions($scope.suggestions[index]);
    suggestion.voteCount++;

    // TODO: check if email is registered in a list
    // TODO: check if email is not already voting
    suggestion.$update( function(data){
      $scope.suggestions[index].voteCount++;
    }, function(err){
      alert('request failed');
    });
  };

}

angular.module('brevesApp').controller('SuggestionCtrl', createSuggestionController)

































// function createSuggestionController ($scope, $http, Suggestions) {
//   $scope.createSuggestion = function () {
//     // check if user can create a suggestion
//     $http
//       .get('api/v1/helper/lists-for-email/' + $scope.suggestion.creatorEmail)
//       .success(function(data, status, headers, config) {
//         if (data.status === "error") {
//           console.log("error in the mail")
//         } else {
//           var suggestion = new Suggestions($scope.suggestion);
//           suggestion.$save();
//           $scope.suggestions = $scope.suggestions || [];
//           $scope.suggestions.push(suggestion);
//         }
//       })
//       .error(function(data, status, headers, config) {
//         // called asynchronously if an error occurs
//         console.log("Api error")
//       });
//   };
// };

// function showSuggestionsController ($scope, Suggestions) {
//   $scope.suggestions = Suggestions.query();

//   $scope.voteForSuggestion = function (index) {
//     // console.log(index);
//     // var sug = $scope.suggestions[index];
//     // Check if email can create a suggestion
//     var suggestion = new Suggestions($scope.suggestions[index]);
//     suggestion.$update( function(data){
//       // console.log('success, got data: ', data);
//       $scope.suggestions[index].voteCount++;
//     }, function(err){
//       alert('request failed');
//     });
//   };

// }

// angular.module('brevesApp')
//   .controller('CreateSuggestionCtrl', createSuggestionController)
//   .controller('ShowSuggestionsCtrl', showSuggestionsController);
