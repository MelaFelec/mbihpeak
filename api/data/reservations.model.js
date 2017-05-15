var mongoose = require('mongoose');

var reservationSchema = new mongoose.Schema({
  _id : {
    type : mongoose.Schema.Types.ObjectId
  },
  tour_id : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Tour',
    required : true
  },
  user_id : {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required : true
  },
  date_of_reservation : {
    type : Date,
    required : true
  },
  number_of_reservations : {
    type : Number,
    required: true,
    max : 3
  },
  payed : {
    type : Boolean
  }
});

mongoose.model('Reservation', reservationSchema, 'reservations');
