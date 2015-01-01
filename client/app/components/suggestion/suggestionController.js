function SuggestionController ($scope, $http, Suggestions) {
  $scope.showAdditionalCreationFields = false;

  $scope.form = {}; // access to the form

  $scope.suggestions = Suggestions.query();
  // $scope.createSuggestionForm.submitted = false;

  $scope.filterFunction = function(element) {
    var re = new RegExp($scope.suggestion_filter, 'gi');
    return element.title.match(re) ? true : false;
  };

  $scope.createSuggestion = function () {
    // console.log(this) // Clean form validation
    console.log($scope.createSuggestion);
    // check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.createSuggestion.creatorEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          $scope.modalAlert({
            type: "error",
            message: "Seuls les personnes déjà inscrites à la newsletter peutvent proposer une suggestion."
          });
        } else {
          $scope.form.createSuggestionForm.$setUntouched(); // Clean form validation
          $scope.createSuggestion.voting = [];
          $scope.createSuggestion.voting.push($scope.createSuggestion.creatorEmail);
          var newSuggestion = new Suggestions($scope.createSuggestion);
          console.log(newSuggestion);
          newSuggestion
          newSuggestion.$save();
          $scope.suggestions.push(newSuggestion);
          $scope.createSuggestion = {};
          $scope.showAdditionalCreationFields = false;
          $scope.modalAlert({
            type: "success",
            message: "Votre suggestion a été ajoutée."
          });
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error");
        $scope.modalAlert({
          type: "error",
          message: "Une erreur s'est produite. Veuillez recommencer."
        });
      });
  };


//   $scope.voteForSuggestion = function (index) {
//     // console.log($scope.suggestions[index]);
//     if (!$scope.suggestions[index].votingEmail) {
//       console.log("email invalide");
//       return;
//     }

//     if ($scope.suggestions[index].voting.indexOf($scope.suggestions[index].votingEmail) !== -1) {
//       console.log("Vous avez deja voté");
//       $scope.modalAlert({
//         type: "error",
//         message: "Vous avez déjà voté. C'est pas bien de tricher."
//       });
//       return;
//     }

//     // Check if email is registered in a list
//     $http
//       .get('api/v1/helper/lists-for-email/' + $scope.suggestions[index].votingEmail)
//       .success(function(data, status, headers, config) {
//         if (data.status === "error") {
//           console.log("not a member");
//           $scope.modalAlert({
//             type: "error",
//             message: "Seuls les personnes déjà inscrites à la newsletter peutvent voter pour une suggestion."
//           });
//         } else {
//           $scope.suggestions[index].voting.push($scope.suggestions[index].votingEmail);
//           var suggestion = new Suggestions($scope.suggestions[index]);
//           suggestion.voteCount++;
//           suggestion.$update(function(data){
//             $scope.suggestions[index].voteCount++;
//           }, function(err){
//             console.log('update request failed');
//           });
//         }
//       })
//       .error(function(data, status, headers, config) {
//         console.log("Api error")
//       });
//   };
// }

 $scope.voteForSuggestion = function (_id) {

    console.log(_id);
    // Find the if in $scope.suggestions array
    var index = $.map($scope.suggestions, function(obj, index) {
      if(obj._id == _id)
        return index;
    })[0];
    console.log($scope.suggestions[index]);
    // return;
    if (!$scope.suggestions[index].votingEmail) { //if undifined
      console.log("email invalide (undefined)");
      return;
    }

    if ($scope.suggestions[index].voting.indexOf($scope.suggestions[index].votingEmail) !== -1) {
      console.log("Vous avez deja voté");
      $scope.modalAlert({
        type: "error",
        message: "Vous avez déjà voté. C'est pas bien de tricher."
      });
      return;
    }

    // Check if email is registered in a list
    $http
      .get('api/v1/helper/lists-for-email/' + $scope.suggestions[index].votingEmail)
      .success(function(data, status, headers, config) {
        if (data.status === "error") {
          console.log("not a member");
          $scope.modalAlert({
            type: "error",
            message: "Seuls les personnes déjà inscrites à la newsletter peuvent voter pour une suggestion."
          });
        } else {
          $scope.suggestions[index].voting.push($scope.suggestions[index].votingEmail);
          var suggestion = new Suggestions($scope.suggestions[index]);
          suggestion.voteCount++;
          suggestion.$update(function(data){
            $scope.suggestions[index].voteCount++;
            $scope.modalAlert({
              type: "success",
              message: "Votre vote a bien été pris en compte"
            });
          }, function(err){
            console.log('update request failed');
            $scope.modalAlert({
              type: "error",
              message: "Une erreur s'est produite, veuillez re-voter s'il vous plait."
            });
          });
        }
      })
      .error(function(data, status, headers, config) {
        console.log("Api error");
        $scope.modalAlert({
          type: "error",
          message: "Une erreur s'est produite, veuillez vérifier votre adresse email et voter à nouveau."
        });
      });
  };
}


angular.module('brevesApp').controller('SuggestionCtrl', SuggestionController)













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
