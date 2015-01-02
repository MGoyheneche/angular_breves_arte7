angular.module('brevesApp').directive('scrollTo', [function() {
  return {
    restrict: 'A',
    link: function(scope, $element, attrs) {
      var idToScroll = attrs.href;
      $element.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $element;
        }
        $("body").animate({
          scrollTop: $target.offset().top - $('nav.navbar').height()
        }, "slow");
      });
    }
  }
}]);
