angular.module('mbihpeakApp').controller('RegisterController', RegisterController);

function RegisterController($http, cityDataFactory, userDataFactory){
  var rc = this;
  rc.title = 'TITLE';


  cityDataFactory.cityList().then(function(response){
    rc.cities = response.data;
    console.log(response.data[1].name);
    console.log("cities" + rc.cities[1]._id);
  });


  userDataFactory.allUsers().then(function(response){
    rc.users = response.data;
    console.log("Usernames " + rc.users[1].username);
  });

  console.log("PROŠAO");

  rc.add_user = function() {
    rc.error = '';

    var user = {
      fullname: rc.name,
      city_id: rc.city_id,
      address: rc.address,
      phone_number: rc.phone_number,
      email: rc.email,
      username: rc.username,
      password: rc.password
    };

    var nexist = true;

    for(var i=0; i<rc.users.length; i++){
      console.log('Ušao u loop');
      if(user.username === rc.users[i].username){
        rc.error = 'Username already exists';
        nexist = false;
      }
      else if(user.email === rc.users[i].email){
        rc.error = 'Email already exists';
        nexist = false;
      }
    }

    if(nexist){
      $http.post('/api/user/register', user).then(function(result){
        console.log(result);
        rc.message = 'Successful registration, please sign in.';
        rc.error = '';
      }).catch(function(error){
        console.log(error);
      });
    }
  }
};
