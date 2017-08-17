angular.module('mbihpeakApp', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($httpProvider, $routeProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/home.html',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: 'RegisterController',
      controllerAs: 'rc',
      access: {
        restricted: false
      }
    })
    .when('/user/:id',{
      templateUrl: 'angular-app/user/user.html',
      controller: 'UserController',
      controllerAs: 'us',
      access: {
        restricted: false
      }
    })
    .when('/gallery',{
      templateUrl: 'angular-app/gallery.html',
      access: {
        restricted: false
      }
    })
    .otherwise({
      redirectTo : '/'
    });
}

function run($rootScope, $location, $window, AuthFactory){
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
      event.preventDefault();
      $location.path('/#tf-home');
    }
  });
}
