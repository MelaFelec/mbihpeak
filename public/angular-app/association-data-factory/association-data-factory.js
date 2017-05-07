angular.module('mbihpeakApp').factory('associationDataFactory',associationDataFactory);

function associationDataFactory($http){
  return{
    associationList : associationList
  };

  function associationList(){
    return $http.get('/api/associations').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
