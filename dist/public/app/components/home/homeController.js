function HomeController($scope, List) {
  $scope.jobs = "jobs";
  List.success(function(list){
    $scope.list = list;
  });
  $scope.mandrill_email_limit = 4000; // Monthly limit of free email
}

angular.module('brevesApp').controller('HomeCtrl', HomeController);
