angular.module('mbihpeakApp', ['ngRoute']).config(config);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/home.html'
    }).when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'rc'
    });
}
