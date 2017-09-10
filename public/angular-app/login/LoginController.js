angular.module('mbihpeakApp').controller('LoginController', LoginController);

function LoginController($http, $location, $route, $window, AuthFactory, jwtHelper, $cookies, $cookieStore) {
  var lc = this;
  lc.title = "UŠAO";

  lc.loggedInUser = $cookieStore.get('user');

  lc.isLoggedIn = function(){
    if(AuthFactory.isLoggedIn){
      return true;
    } else{
      return false;
    }
  };

  lc.login = function(){
    if(lc.username && lc.password){
      var user = {
        username : lc.username,
        password : lc.password
      };

      $http.post('/api/user/login', user).then(function(response){
        if(response.data.success){
          $window.sessionStorage.token = response.data.token;
          AuthFactory.isLoggedIn = true;
          var token = $window.sessionStorage.token;
          var decodedToken = jwtHelper.decodeToken(token);

          $cookieStore.put('user', response.data.user);
          $cookies.isLoggedIn = true;
          lc.loggedInUser = $cookieStore.get('user');
          $route.reload();
        }
      }).catch(function(error){

        $http.post('/api/association/login', user).then(function(response){
          if(response.data.success){
            $window.sessionStorage.token = response.data.token;
            AuthFactory.isLoggedIn = true;
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);

            $cookieStore.put('user', response.data.user);
            $cookies.isLoggedIn = true;
            lc.loggedInUser = $cookieStore.get('user');
            $route.reload();
          }
        }).catch(function(error){
          if(error.data.success==false){
            lc.error = 'Login failed! Try again...'
          }
        })
      })

    }
  }

  lc.logout = function(){
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $route.reload();
  }

  lc.isActive = function(url){
    var currentPath = $location.path().split('/')[1];
    return(url === currentPath ? 'active' : '');
  }
}
