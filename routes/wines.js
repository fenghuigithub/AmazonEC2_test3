var mongoose = require('mongoose'); 
mongoose.connect("mongodb://fengh:app@ec2-52-90-249-40.compute-1.amazonaws.com:27017/dummyDB"); 
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    var schema = new mongoose.Schema({name:String});
    var Product = mongoose.model('product',schema);
    var gift = new Product({name:'doll'});
    console.log(gift.name);
    gift.save(function(err){
        if(err) return handleError(err);
        console.log('Yeah!');
    });
});