function RegisterController($scope, $http){
  console.log("Hello from ng controler");

  $scope.add_user = function(){
    console.log($scope.user);
    $http.post('/user', $scope.user).success(function(response){
      console.log(response);
    });
  }

}
