angular.module('mbihpeakApp').factory('associationDataFactory',associationDataFactory);

function associationDataFactory($http){
  return{
    associationDisplay : associationDisplay,
    tenassociationList : tenassociationList,
    addAssociation : addAssociation,
    associationsList : associationsList,
    deleteAssociation : deleteAssociation,
    editAssociation : editAssociation,
    addTourForAssoc : addTourForAssoc,
    deleteTourForAssoc : deleteTourForAssoc
  };

  function associationDisplay(id){
    return $http.get('/api/association/' + id).then(complete).catch(failed);
  }

  function tenassociationList(){
    return $http.get('/api/tenassociations').then(complete).catch(failed);
  }

  function addAssociation(assoc){
    return $http.post('api/associations', assoc).then(complete).catch(failed);
  }

  function addTourForAssoc(tour){
    return $http.post('api/tourForAssoc', tour).then(complete).catch(failed);
  }

  function associationsList(){
    return $http.get('api/associations').then(complete).catch(failed);
  }

  function deleteAssociation(id){
    return $http.delete('/api/deleteAssociation/'+ id).then(complete).catch(failed);
  }

  function editAssociation(assoc){
    return $http({
      method: 'PUT',
      url:'/api/updateAssociation/' + assoc._id,
      data: assoc
    }).then(complete).catch(failed);
  }


  function deleteTourForAssoc(data){
    return $http({
      method: 'POST',
      url: '/api/deleteTourForAssoc',
      data: data
    }).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
