function HomeController($scope) {
    $scope.jobs = jobs;
    console.log('hello');
}

angular.module('brevesApp').controller('HomeCtrl', HomeController);
