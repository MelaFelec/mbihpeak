angular.module('mbihpeakApp').controller('AssociationsController', AssociationsController);

function AssociationsController(associationDataFactory){
  var self = this;
  associationDataFactory.associationList().then(function(response){
    self.associations = response.data;
  });
}
