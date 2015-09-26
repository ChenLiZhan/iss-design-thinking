var app = angular.module('leeApp', ['ui.router', 'ui.bootstrap'])

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $locationProvider) {
  $controllerProvider.allowGlobals();

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/index.html',
      controller: 'Index'
    });

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}]);