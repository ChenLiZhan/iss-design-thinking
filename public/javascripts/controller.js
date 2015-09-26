'use strict'

function Index($scope, $location, $anchorScroll) {
  $scope.scrollTop = function() {
    $location.hash('attend');
    $anchorScroll();
  }
}