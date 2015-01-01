function subscribeFormController ($scope, $http) {
  $scope.subscriber = [];

  $scope.subscribeToList = function () {
    // console.log($scope.subscriber);
    $http.post('/api/v1/lists/subscribe', {id: 'b0e318dd95', email: $scope.subscriber.email}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      console.log(data);
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log(data);
    });
  }
}

angular.module('brevesApp').controller('SubscribeFormController', subscribeFormController)

