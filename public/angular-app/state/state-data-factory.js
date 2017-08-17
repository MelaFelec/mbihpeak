angular.module('mbihpeakApp').factory('stateDataFactory',associationDataFactory);

function stateDataFactory($http){
  return{
    stateList : stateList
  };

  function stateList(){
    return $http.get('/api/states').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
