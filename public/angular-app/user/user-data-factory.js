angular.module('mbihpeakApp').factory('userDataFactory',userDataFactory);

function userDataFactory($http){
  return{
    userDisplay : userDisplay
  };

  function userDisplay(id){
    return $http.get('/api/user/' + id).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
