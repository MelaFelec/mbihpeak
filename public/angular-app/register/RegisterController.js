angular.module('mbihpeakApp').controller('RegisterController', RegisterController);

function RegisterController($http, cityDataFactory){
  var rc = this;
  rc.title = 'TITLE';


  cityDataFactory.cityList().then(function(response){
    rc.cities = response.data;
    console.log(response.data[1].name);
    console.log("cities" + rc.cities[1]._id);
  });
  console.log("PROŠAO");

  rc.add_user = function() {
    console.log("city " + rc.city_id);
    var user = {
      fullname: rc.name,
      city_id: rc.city_id,
      address: rc.address,
      phone_number: rc.phone_number,
      email: rc.email,
      username: rc.username,
      password: rc.password
    };
    console.log(user);

    $http.post('/api/user/register', user).then(function(result){
      console.log(result);
      rc.message = 'Successful registration, please sign in.';
      rc.error = '';
    }).catch(function(error){
      console.log(error);
    });
  }
};
