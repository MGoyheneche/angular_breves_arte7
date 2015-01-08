angular.module('brevesApp').filter('iso8601Period', [function () {
  return function(input) {
    var match = input.match(/(\d*)M(\d*)S/);
    return match[1] + ' min';
  };
}]);
