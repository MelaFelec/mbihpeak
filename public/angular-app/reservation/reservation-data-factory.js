angular.module('mbihpeakApp').factory('reservationDataFactory',reservationDataFactory);

function reservationDataFactory($http){
  return{
    reservationForUserTour : reservationForUserTour,
    reservationList : reservationList,
    addOneReservation : addOneReservation,
    deleteReservation : deleteReservation,
    getReservationsByTourId :getReservationsByTourId
  };

  function reservationForUserTour(data){
    return $http({
      method: 'POST',
      url: '/api/reservationForUserTour',
      data: data
    }).then(complete).catch(failed);
  }

  function getReservationsByTourId(id){
    return $http.get('api/reservationsByTourId/' + id).then(complete).catch(failed);
  }

  function reservationList(){
    return $http.get('/api/reservations').then(complete).catch(failed);
  }

  function addOneReservation(reser){
    return $http.post('api/reservations', reser).then(complete).catch(failed);
  }

  function deleteReservation(id){
    return $http.delete('/api/deleteReservation/'+ id).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
