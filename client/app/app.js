angular.module('myApp', [])
// BadController will fail to instantiate, due to relying on automatic function annotation,
// rather than an explicit annotation
.controller('BadController', function($scope) {
  $scope.a = 1;
  $scope.b = 2;
})
// Unlike BadController, GoodController1 and GoodController2 will not fail to be instantiated,
// due to using explicit annotations using the array style and $inject property, respectively.
.controller('GoodController1', ['$scope', '$http', function($scope, $http) {
  $scope.a = 1;
  $scope.b = 2;
  // $http.jsonp('https://us7.api.mailchimp.com/2.0/lists/members.json?apikey=674484132595aa3b1f408cff27a1fb46-us7&id=b0e318dd95?callback=JSON_CALLBACK').
  //   success(function(data, status, headers, config) {
  //     // this callback will be called asynchronously
  //     // when the response is available
  //     $scope.subscribers = data;
  //   }).
  //   error(function(data, status, headers, config) {
  //     // called asynchronously if an error occurs
  //     // or server returns response with an error status.
  //   });
    //     var url = "https://us7.api.mailchimp.com/2.0/lists/members.json?callback=JSON_CALLBACK&apikey=674484132595aa3b1f408cff27a1fb46-us7&id=b0e318dd95";

    // $http.jsonp(url)
    //     .success(function(data){
    //         console.log("data.found");
    //         console.log(data.found);
    //         console.log(JSON_CALLBACK);
    //     });

        var url = "https://us7.api.mailchimp.com/2.0/lists/members.json?apikey=674484132595aa3b1f408cff27a1fb46-us7&id=b0e318dd95&callback=JSON_CALLBACK";

        $http.post(url)
            .success(function(data){
                // console.log(data.found);
            });
}])
.controller('GoodController2', GoodController2);
function GoodController2($scope) {
  $scope.name = "World";
}
GoodController2.$inject = ['$scope'];
