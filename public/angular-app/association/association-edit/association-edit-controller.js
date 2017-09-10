angular.module('mbihpeakApp').controller('EditAssociationController', EditAssociationController);

function EditAssociationController($http, $location,$window, $route, $routeParams, associationDataFactory, cityDataFactory, userDataFactory){
  var eac = this;
  eac.title = 'UŠAO';
  var id = $routeParams.id;

  cityDataFactory.cityList().then(function(response){
    if(response){
      eac.cities = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  associationDataFactory.associationDisplay(id).then(function(response){
    if(response){
      eac.assocToEdit = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  associationDataFactory.associationsList().then(function(response){
    if(response){
      eac.assocList = response.data;
      for(var i=0; i<eac.assocList.length; i++){
        if(eac.assocList[i]._id === id){
          eac.assocList.splice(i, 1);
        }
      }


      console.log('Lista: '+ eac.assocList[0].name);
    }
  }).catch(function(error){
    console.log(error);
  });

  userDataFactory.allUsers().then(function(response){
    if(response){
      eac.users = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  eac.edit_assoc = function(){
    eac.error = '';

    var assoc = {
      _id: id,
      name: eac.assocToEdit.name,
      description: eac.assocToEdit.description,
      city_id: eac.assocToEdit.city_id,
      address: eac.assocToEdit.address,
      phone_number: eac.assocToEdit.phone_number,
      email: eac.assocToEdit.email,
      username: eac.assocToEdit.username,
      password: eac.assocToEdit.password
    };

    var nexist = true;

    for(var i=0; i<eac.assocList.length; i++){
      console.log('Ušao u loop');
      if(assoc.username === eac.assocList[i].username){
        eac.error = 'Username already exists';
        nexist = false;
      }
      else if(assoc.email === eac.assocList[i].email){
        eac.error = 'Email already exists';
        nexist = false;
      }
    }
    for(var i=0; i<eac.users.length; i++){
      console.log('Ušao u loop');
      if(assoc.username === eac.users[i].username){
        eac.error = 'Username already exists';
        nexist = false;
      }
      else if(assoc.email === eac.users[i].email){
        eac.error = 'Email already exists';
        nexist = false;
      }
    }

    if(nexist){
      console.log("Associjacija " + assoc);
      associationDataFactory.editAssociation(assoc).then(function(response){
        if(response){
          console.log('Edit association '+response.data);
          $window.alert('Association edited!');
          $location.path('/association/'+ id);
        }
      }).catch(function(error){
        console.log(error);
      });
    }
  }
};
