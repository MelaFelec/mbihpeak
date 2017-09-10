angular.module('mbihpeakApp').controller('AddTourController', AddTourController);

function AddTourController($http, $cookies, $cookieStore, $location, $window, mountainDataFactory, tourDataFactory, associationDataFactory){
  var atc = this;
  atc.assoc = $cookieStore.get('user');
  var assoc_id = atc.assoc._id;

  mountainDataFactory.mountainList().then(function(response){
    if(response){
      atc.mountains = response.data;
      console.log('Planina ' + atc.mountains[1].name);
    }
  }).catch(function(err){
    console.log(err.message);
  });

  atc.add_tour = function(){
    atc.error = '';
    var newDate = new Date( atc.start_date.getTime() - (4 * 24 * 60 * 60 * 1000) );
    //date.setDate(atc.start_date.getDate() - 4);

    var tour = {
      name: atc.name,
      description: atc.description,
      start_date: atc.start_date,
      end_date: atc.end_date,
      end_reservation_date: newDate,
      number_of_available_places: atc.number_of_available_places,
      price: atc.price,
      mountain_id: atc.mountain_id
    };

    tourDataFactory.addTour(tour).then(function(response){
      console.log("Tour added");
      var tourForAssoc = {"assoc_id": assoc_id, "tour_id": response.data._id};

      associationDataFactory.addTourForAssoc(tourForAssoc).then(function(response){
        console.log("Added tour for association");

        $window.alert('Tour added successfully!');
        $location.path('/association/'+assoc_id);
      }).catch(function(err){
        console.log(err.statusText);
      });

    }).catch(function(err){
      console.log(err.statusText);
    });

  }
};
