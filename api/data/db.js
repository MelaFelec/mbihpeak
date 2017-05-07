var mongoose = require('mongoose');
var dburl = 'mongodb://mbihpeak.com:Xp7Mshgwnrrt@80.65.165.60:2721/mbihpeak?authSource=admin';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected to ' + dburl);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error ' + err);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination(SIGINT)');
    process.exit(0);
  });
});
process.on('SIGUSR2', function(){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through app termination');
    process.kill(process.pid, 'SIGUSR2');
  });
});
