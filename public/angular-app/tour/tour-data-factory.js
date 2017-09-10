angular.module('mbihpeakApp').factory('tourDataFactory',tourDataFactory);

function tourDataFactory($http){
  return{
    tourForAssoc : tourForAssoc,
    getOneTour : getOneTour,
    addTour : addTour,
    deleteTour : deleteTour,
    editTour : editTour,
    editPlaces : editPlaces,
    editPlacesInc :editPlacesInc
  };

  function tourForAssoc(ids){
    return $http({
      method: 'POST',
      url:'/api/toursForAssoc',
      data: ids
    }).then(complete).catch(failed);
  }

  function getOneTour(id){
    return $http.get('api/tour/' + id).then(complete).catch(failed);
  }

  function addTour(tour){
    return $http.post('api/tours', tour).then(complete).catch(failed);
  }

  function deleteTour(id){
    return $http.delete('/api/deleteTour/'+ id).then(complete).catch(failed);
  }

  function editTour(tour){
    return $http({
      method: 'PUT',
      url:'/api/updateTour/' + tour._id,
      data: tour
    }).then(complete).catch(failed);
  }

  function editPlaces(data){
    return $http({
      method: 'POST',
      url: '/api/editPlaces',
      data: data
    }).then(complete).catch(failed);
  }

  function editPlacesInc(data){
    return $http({
      method: 'POST',
      url: '/api/editPlacesInc',
      data: data
    }).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.status);
  }
}
