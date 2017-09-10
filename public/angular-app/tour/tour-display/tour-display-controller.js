angular.module('mbihpeakApp').controller('TourDisplayController', TourDisplayController);

function TourDisplayController($http, $location, $window, $route, $cookies, $cookieStore, $routeParams, tourDataFactory, associationDataFactory, reservationDataFactory, userDataFactory){
  var tc = this;
  var id = $routeParams.id;
  tc.id = id;
  tc.message = '';

  tc.user = $cookieStore.get('user');
  tc.checkId = $cookieStore.get('this_assoc');

  if(tc.user.status === 'user'){
    console.log('UŠAO');
    var data = {"tour_id": id, "user_id": tc.user._id};

    reservationDataFactory.reservationForUserTour(data).then(function(response){
      if(response){
        tc.message = 'You have a reservation for this tour :)';
        tc.res_id = response.data._id;
        tc.number = response.data.number_of_reservations;
        console.log('Number ' + tc.res_id);
      }
    }).catch(function(err){
      console.log(err.statusText);
    });
  };

  tourDataFactory.getOneTour(id).then(function(response){
    if(response)
    {
      tc.tour = response.data;

      var date = new Date(tc.tour.start_date);
      var date1 = new Date(tc.tour.end_date);
      var date2 = new Date(tc.tour.end_reservation_date);
      tc.tour.start_date = date.toDateString();
      tc.tour.end_date = date1.toDateString();
      tc.tour.end_reservation_date = date2.toDateString();}

      if(tc.user.status === 'assoc' && tc.checkId === tc.user._id){
        reservationDataFactory.getReservationsByTourId(id).then(function(response){
          if(response){
            tc.reserv = response.data;
            var userids = [];
            for(var i=0; i<tc.reserv.length; i++){
              userids[i]= {user_id : tc.reserv[i].user_id};
            }
            console.log('userid '+ userids[0].user_id);

            userDataFactory.getUsersByIds(userids).then(function(response){
              if(response){
                tc.users = response.data;
                console.log(tc.users[0].fullname);
                tc.reservations= [];
                for(var i=0; i<tc.users.length; i++){
                  tc.reservations[i]= {"name" : tc.users[i].fullname, "payed" : tc.reserv[i].payed, "res_id" : tc.reserv[i]._id, "number": tc.reserv[i].number_of_reservations};
                }
                console.log('rezervacije: ' + tc.reservations[0]);
              }
            }).catch(function(err){
              console.log(err.statusText);
            });
          }
        }).catch(function(err){
          console.log(err.statusText);
        });
      }

  }).catch(function(err){
    console.log(err.statusText);
  });

  tc.routeToEdit = function(id){
    $location.path('/edittour/'+id);
  }

  tc.reserve = function(){
    var number = tc.number_of_reservations
    var reser ={
      tour_id : id,
      user_id : tc.user._id,
      number_of_reservations : tc.number_of_reservations
    };

    reservationDataFactory.addOneReservation(reser).then(function(response){
      if(response)
      {
        console.log('Reservation added ' + id + ' '+ reser.number_of_reservations);
        var data = {"tour_id" : id, "number": number};

        tourDataFactory.editPlaces(data).then(function(response){
          console.log('Edited tour');
          $window.alert('Reservation added successfully!');
          $route.reload();
        }).catch(function(err){
          console.log(err.statusText);
        });
      }

    }).catch(function(err){
      console.log(err.statusText);
    });

  }

  tc.deletereser = function(res_id, number){
    reservationDataFactory.deleteReservation(res_id).then(function(response){
      if(response)
      {
        console.log('Reser deleted');
        var data = {"tour_id" : id, "number": number};

        tourDataFactory.editPlacesInc(data).then(function(response){
          console.log('Edited tour');
          $window.alert('Reservation deleted!');
          $route.reload();
        }).catch(function(err){
          console.log(err.statusText);
        });
      }

    }).catch(function(err){
      console.log(err.statusText);
    });
  }

  tc.deletetour = function(id, assoc_id){
    tourDataFactory.deleteTour(id).then(function(response){
      console.log("Tour deleted");
      var tourForAssoc = {"assoc_id": assoc_id, "tour_id": id};

      associationDataFactory.deleteTourForAssoc(tourForAssoc).then(function(response){
        console.log("Tour for assoc deleted");
        $window.alert('Tour deleted!');
        $location.path('/association/'+ assoc_id);
      }).catch(function(err){
        console.log(err.statusText);
      });

    }).catch(function(err){
      console.log(err.statusText);
    });
  }
}
