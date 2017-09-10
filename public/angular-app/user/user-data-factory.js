angular.module('mbihpeakApp').factory('userDataFactory',userDataFactory);

function userDataFactory($http){
  return{
    userDisplay : userDisplay,
    allUsers : allUsers,
    getUsersByIds : getUsersByIds
  };

  function getUsersByIds(ids){
    return $http({
      method: 'POST',
      url:'/api/getUsersByIds',
      data: ids
    }).then(complete).catch(failed);
  }

  function userDisplay(id){
    return $http.get('/api/user/' + id).then(complete).catch(failed);
  }

  function allUsers(){
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
