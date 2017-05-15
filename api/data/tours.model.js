var mongoose = require('mongoose');
var statuses = ['A', 'C', 'F', 'O'];

var tourSchema = new mongoose.Schema({
  _id : {
    type : Schema.Types.ObjectId
  },
  name : {
    type : String,
    required: true
  },
  description : {
    type : String,
    required : true
  },
  start_date : {
    type : Date,
    required : true
  },
  end_date : {
    type : Date,
    required : true
  },
  end_reservation_date : {
    type : Date,
    required : true
  },
  tour_status : {
    type: String,
    enum : statuses,
    required : true
  },
  number_of_available_places :  {
    type : Number,
    required : true,
    max : 100
  },
  price : {
    type : Number,
    required : true
  },
  mountain_id : {
    type: mongoose.Schema.Types.ObjectId, ref: 'Mountain',
    required : true
  }
});

mongoose.model('Tour', tourSchema, 'tours');
