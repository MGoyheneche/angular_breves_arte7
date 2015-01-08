angular.module('brevesApp').
  controller('SubscribeFormController', ['$scope', '$http', '$rootScope', 'List', function ($scope, $http, $rootScope, List) {

  List.success(function(list){
    $scope.list = list.data[0];
    console.log($scope.list.stats.member_count);
    $scope.remainingPlace = Math.floor($scope.mandrillEmailLimit - $scope.list.stats.member_count);
  });

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

    $scope.unsubscribeToList = function () {
      console.log($scope.unsubscriber.email);

      $http.post('/api/v1/lists/unsubscribe', {id: 'b0e318dd95', email: $scope.unsubscriber.email}).success(function(data, status, headers, config) {
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

}]);


