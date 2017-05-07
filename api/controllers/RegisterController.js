var dbconn = require('../data/dbconnection.js');

module.exports.register = function RegisterController($scope, $http){

  var db = dbconn.get();

  //console.log("DB", db);

  /*$scope.add_user = function(){
    console.log($scope.user);
    $http.post('/user', $scope.user).success(function(response){
      console.log(response);
    });
  }*/

  $http.status(200).json({"jsonData" : true});
};
