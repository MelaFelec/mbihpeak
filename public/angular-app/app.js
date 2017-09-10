angular.module('mbihpeakApp', ['ngRoute', 'angular-jwt', 'ngCookies']).config(config).run(run);

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
    .when('/addassociation', {
      templateUrl: 'angular-app/association/association-add/association-add.html',
      controller: 'AddAssociationController',
      controllerAs: 'aac',
      access: {
        restricted: true
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
    .when('/association/:id',{
      templateUrl: 'angular-app/association/association-display/association.html',
      controller: 'AssociationDispController',
      controllerAs: 'ac',
      access: {
        restricted: false
      }
    }).when('/editassociation/:id', {
      templateUrl: 'angular-app/association/association-edit/association-edit.html',
      controller: 'EditAssociationController',
      controllerAs: 'eac',
      access: {
        restricted: true
      }
    })
    .when('/tour/:id',{
      templateUrl: 'angular-app/tour/tour-display/tour-display.html',
      controller: 'TourDisplayController',
      controllerAs: 'tc',
      access: {
        restricted: false
      }
    }).when('/addtour',{
      templateUrl: 'angular-app/tour/tour-add/tour-add.html',
      controller: 'AddTourController',
      controllerAs: 'atc',
      access: {
        restricted: true
      }
    }).when('/edittour/:id', {
      templateUrl: 'angular-app/tour/tour-edit/tour-edit.html',
      controller: 'EditTourController',
      controllerAs: 'etc',
      access: {
        restricted: true
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
