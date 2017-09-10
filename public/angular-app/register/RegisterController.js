angular.module('mbihpeakApp').controller('RegisterController', RegisterController);

function RegisterController($http, cityDataFactory, userDataFactory, associationDataFactory){
  var rc = this;
  rc.title = 'TITLE';

  cityDataFactory.cityList().then(function(response){
    if(response){
      rc.cities = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  userDataFactory.allUsers().then(function(response){
    if(response){
      rc.users = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  associationDataFactory.associationsList().then(function(response){
    if(response){
      rc.assoc = response.data;
    }
  }).catch(function(error){
    console.log(error);
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
      for(var i=0; i<rc.assoc.length; i++){
        console.log('Ušao u assoc loop');
        if(user.username === rc.assoc[i].username){
          rc.error = 'Username already exists';
          nexist = false;
        }
        else if(user.email === rc.assoc[i].email){
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
