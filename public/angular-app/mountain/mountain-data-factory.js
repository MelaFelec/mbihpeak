angular.module('mbihpeakApp').factory('mountainDataFactory',mountainDataFactory);

function mountainDataFactory($http){
  return{
    mountainList : mountainList
  };

  function mountainList(){
    return $http.get('/api/mountains').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
