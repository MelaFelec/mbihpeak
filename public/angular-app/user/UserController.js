angular.module('mbihpeakApp').controller('UserController', UserController);

function UserController($http, $route, $routeParams, userDataFactory){
  var us = this;
  us.title = 'USER';
  var id = $routeParams.id;
  console.log("ID" + id);
  
  userDataFactory.userDisplay(id).then(function(response) {
    us.userd = response.data;
    console.log("User " + us.userd.username + " " + is.userd._id);
  });

};
