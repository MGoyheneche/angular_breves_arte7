function iso8601PeriodFilter () {
  return function(input) {
    var match = input.match(/(\d*)M(\d*)S/);
    return match[1] + ' min';
  };
}

angular.module('brevesApp').filter('iso8601Period', iso8601PeriodFilter);
