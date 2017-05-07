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
// .when('/home', {
//   templateUrl: 'home.html'
// })
// angular.module('registerApp', ['ngRoute']).config(config);
//
// function config($routeProvider) {
//   $routeProvider
//     .when('/register', {
//       templateUrl: 'angular-app/register/register.html',
//       controller: RegisterController,
//       controllerAs: 'rc'
//     });
// };
//
// angular.module('myApp', ['mbihpeakApp', 'registerApp'])
// .config(function config ($routeProvider){
//   'use strict';
//   $routeProvider.otherwise({redirectTo : '/'});
// });
