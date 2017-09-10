angular.module('mbihpeakApp').controller('EditTourController', EditTourController);

function EditTourController($http, $location,$window, $route, $routeParams, tourDataFactory, mountainDataFactory){
  var etc = this;
  var id = $routeParams.id;

  mountainDataFactory.mountainList().then(function(response){
    if(response){
      etc.mountains = response.data;
    }
  }).catch(function(error){
    console.log(error);
  });

  tourDataFactory.getOneTour(id).then(function(response){
    if(response){
      etc.tourToEdit = response.data;
      var date = new Date(etc.tourToEdit.start_date);
      var date1 = new Date(etc.tourToEdit.end_date);

      etc.tourToEdit.start_date = date;
      etc.tourToEdit.end_date = date1;
    }
  }).catch(function(error){
    console.log(error);
  });


  etc.edit_tour = function(){
    etc.error = '';
    var newDate = new Date( etc.tourToEdit.start_date.getTime() - (4 * 24 * 60 * 60 * 1000) );

    var tour = {
      _id: id,
      name: etc.tourToEdit.name,
      description: etc.tourToEdit.description,
      start_date: etc.tourToEdit.start_date,
      end_date: etc.tourToEdit.end_date,
      end_reservation_date: newDate,
      number_of_available_places: etc.tourToEdit.number_of_available_places,
      price: etc.tourToEdit.price,
      mountain_id: etc.tourToEdit.mountain_id
    };

      console.log("Tour " + tour);
      tourDataFactory.editTour(tour).then(function(response){
        if(response){
          console.log('Edit tour '+response.data);
          $window.alert('Tour edited!');
          $location.path('/tour/'+ id);
        }
      }).catch(function(error){
        console.log(error);
      });

  }
};
