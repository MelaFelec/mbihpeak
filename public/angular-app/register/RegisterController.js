angular.module('mbihpeakApp').controller('RegisterController', RegisterController);

function RegisterController(){
  var rc = this;
  rc.title = 'TITLE';

  rc.add_user() {
    var user = {
      email: rc.email,
      username: rc.username,
      password: rc.password,
      name: rc.name,
      city: rc.city,
      state: rc.state,
      address: rc.address,
      phone_number: rc.phone_number
    };

    $http.post('api/user/register', user).then(function(result){
      console.log(result);
      rc.message = 'Successful registration, please login.';
      rc.error = '';
    }).catch(function(error){
      console.log(error);
    });
  }
};
