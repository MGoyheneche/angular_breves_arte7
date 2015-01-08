angular.module('brevesApp').
  controller('SuggestionCtrl', ['$scope', '$http', 'Suggestions', function ($scope, $http, Suggestions) {
    $scope.showAdditionalCreationFields = false;

    $scope.form = {}; // access to the form

    $scope.suggestions = Suggestions.query();

    $scope.filterFunction = function(element) {
      var re = new RegExp($scope.suggestion_filter, 'gi');
      return element.title.match(re) ? true : false;
    };

    $scope.createSuggestion = function () {
      console.log($scope.createSuggestion);
      // check if email is registered in a list
      $http
        .get('api/v1/helper/lists-for-email/' + $scope.createSuggestion.creatorEmail)
        .success(function(data, status, headers, config) {
          if (data.status === "error") {
            $scope.modalAlert({
              type: "error",
              message: "Seules les personnes déjà inscrites à la newsletter peutvent proposer une suggestion."
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


   $scope.voteForSuggestion = function (_id) {

      console.log(_id);
      // Find the id in $scope.suggestions array
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
              message: "Seules les personnes déjà inscrites à la newsletter peuvent voter pour une suggestion."
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
}]);

