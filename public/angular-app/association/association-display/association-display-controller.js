angular.module('mbihpeakApp').controller('AssociationDispController', AssociationDispController);

function AssociationDispController($http, $location, $window, $route, $routeParams, associationDataFactory, cityDataFactory, tourDataFactory, $cookies, $cookieStore){
  var ac = this;
  var id = $routeParams.id;
  ac.checkId = id;
  ac.user = $cookieStore.get('user');
  $cookieStore.put('this_assoc', id);

  var tourids= [];


  associationDataFactory.associationDisplay(id).then(function(response){
    ac.assoc = response.data;

    cityDataFactory.oneCity(ac.assoc.city_id).then(function(response){
      ac.city = response.data;
    });

    for(var i=0; i<ac.assoc.tour_id.length; i++){
      tourids[i]= {tour_id : ac.assoc.tour_id[i]};
    }
    tourDataFactory.tourForAssoc(tourids).then(function(response){
      if(response)
      {
        ac.tours = response.data;
        for(var i=0; i<ac.tours.length; i++){
        var date = new Date(ac.tours[i].start_date);
        var date1 = new Date(ac.tours[i].end_date);
        ac.tours[i].start_date = date.toDateString();
        ac.tours[i].end_date = date1.toDateString();
      }
    }
    }).catch(function(err){
      console.log(err.message);
    });
  });

  ac.routeToEdit = function(id){
    $location.path('/editassociation/'+id);
  }

  ac.routeToAddTour = function(id) {
    $location.path('/addtour/');
  }

  ac.deleteassoc = function(id){
    associationDataFactory.deleteAssociation(id).then(function(response){
      console.log("Assoc deleted");
      $window.alert('Association deleted!');
      $location.path('/#tf-team');
    }).catch(function(err){
      console.log(err.statusText);
    });
  }

};
