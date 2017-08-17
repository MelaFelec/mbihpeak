angular.module('mbihpeakApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper) {
  var lc = this;
  lc.title = "UŠAO";

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
          lc.loggedInUser = decodedToken.username;
        }
      }).catch(function(error){
        console.log(error);
      })
    }
  }

  lc.logout = function(){
    AuthFactory.isLoggedIn = false;
    delete $window.sessionStorage.token;
    $location.path('/#tf-home');
  }

  lc.isActive = function(url){
    var currentPath = $location.path().split('/')[1];
    return(url === currentPath ? 'active' : '');
  }
}
