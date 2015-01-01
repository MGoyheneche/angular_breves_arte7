function subscribeFormController ($scope, $http, $rootScope) {

  $scope.subscribeToList = function () {
    console.log($scope.subscriber.email);

    $http.post('/api/v1/lists/subscribe', {id: 'b0e318dd95', email: $scope.subscriber.email}).success(function(data, status, headers, config) {
        console.log("Tout va bien");

        $scope.modalAlert({
          type: "success",
          message: "Votre demande à bien été prise en compte, un email vous à été envoyé."
        });
      }).error(function(data, status, headers, config) {
        $scope.modalAlert({
          type: "error",
          message: data
        });
        console.log(data);
      });
  }

}

angular.module('brevesApp').controller('SubscribeFormController', subscribeFormController)

