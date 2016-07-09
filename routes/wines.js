var mongoose = require('mongoose'); 
mongoose.connect("mongodb://fengh:app@ec2-54-173-25-145.compute-1.amazonaws.com:27017/dummyDB"); 
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
    //console.log('Yeah!');
});
var testSchema = new mongoose.Schema({name:String});
module.exports = mongoose.model('test',testSchema);
// module.exports = function(mongoose){

// 	var Material = new testSchema({name:String});
// 	var models = {Materials:mongoose.model('Materials',Material)};
// 	return models;
// }
