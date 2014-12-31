function createSuggestionController ($scope, $http, Suggestions) {

  $scope.suggestions = Suggestions.query();

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
          $scope.suggestion = {};
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error")
      });
  };

  $scope.voteForSuggestion = function (index) {
    if (!$scope.suggestions[index].votingEmail) {
      console.log("email invalide");
      return;
    }

    if ($scope.suggestions[index].voting.indexOf($scope.suggestions[index].votingEmail) !== -1) {
      console.log("Vous avez deja voté");
      return;
    }

    // Check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.suggestions[index].votingEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          console.log("not a member")
        } else {
          $scope.suggestions[index].voting.push($scope.suggestions[index].votingEmail);
          var suggestion = new Suggestions($scope.suggestions[index]);
          suggestion.voteCount++;
          suggestion.$update(function(data){
            $scope.suggestions[index].voteCount++;
          }, function(err){
            console.log('update request failed');
          });
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error")
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
