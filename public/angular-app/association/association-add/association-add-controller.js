angular.module('mbihpeakApp').controller('AddAssociationController', AddAssociationController);

function AddAssociationController($http, $location, associationDataFactory, cityDataFactory, userDataFactory){
  var aac = this;

  cityDataFactory.cityList().then(function(response){
    if(response){
      aac.cities = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  associationDataFactory.associationsList().then(function(response){
    if(response){
      aac.assocList = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  userDataFactory.allUsers().then(function(response){
    if(response){
      aac.users = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  aac.add_assoc = function(){
    aac.error = '';

    var assoc = {
      name: aac.name,
      description: aac.description,
      city_id: aac.city_id,
      address: aac.address,
      phone_number: aac.phone_number,
      email: aac.email,
      username: aac.username,
      password: aac.password
    };

    var nexist = true;

    for(var i=0; i<aac.assocList.length; i++){
      console.log('Ušao u loop');
      if(assoc.username === aac.assocList[i].username){
        aac.error = 'Username already exists';
        nexist = false;
      }
      else if(assoc.email === aac.assocList[i].email){
        aac.error = 'Email already exists';
        nexist = false;
      }
    }
    for(var i=0; i<aac.users.length; i++){
      console.log('Ušao u loop');
      if(user.username === aac.users[i].username){
        aac.error = 'Username already exists';
        nexist = false;
      }
      else if(user.email === aac.users[i].email){
        aac.error = 'Email already exists';
        nexist = false;
      }
    }

    if(nexist){
      $http.post('/api/associations', assoc).then(function(result){
        console.log(result);
        aac.message = 'Successful registration, please sign in.';
        aac.error = '';
        $location.path('/#/#tf-team');
      }).catch(function(error){
        console.log(error);
      });
    }
  }
};
