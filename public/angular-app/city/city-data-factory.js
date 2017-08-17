angular.module('mbihpeakApp').factory('cityDataFactory',cityDataFactory);

function cityDataFactory($http){
  return{
    cityList : cityList,
    oneCity : oneCity
  };

  function cityList(){
    return $http.get('/api/cities').then(complete).catch(failed);
  }

  function oneCity(id){
    return $http.get('/api/city/' + id).then(complete).catch(failed);
  }
  
  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }
}
