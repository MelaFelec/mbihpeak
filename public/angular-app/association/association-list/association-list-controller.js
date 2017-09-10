angular.module('mbihpeakApp').controller('AssociationsController', AssociationsController);

function AssociationsController(associationDataFactory, AuthFactory, $cookies, $cookieStore){
  var ac = this;
  ac.user = $cookieStore.get('user');

  ac.isLoggedIn = function(){
    if(AuthFactory.isLoggedIn){
      return true;
    } else{
      return false;
    }
  };

  associationDataFactory.tenassociationList().then(function(response){
    ac.associations = response.data;
  });

}
