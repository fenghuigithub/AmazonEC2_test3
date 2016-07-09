// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
// var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
// var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoOp = require('./routes/wines');
var router = express.Router();
// var wine = require('./app/wines');

// configuration ===============================================================
// mongoose.connect("mongodb://fengh:app@ec2-52-90-249-40.compute-1.amazonaws.com:27017/dummyDB"); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

//app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': false})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// Create data in database===========================================================
// var db=mongoose.connection;
// db.on('error',console.error.bind(console,'connection error:'));
// db.once('open',function(){
// 	var schema = new mongoose.Schema({name:String});
// 	var Product = mongoose.model('product',schema);
// 	var gift = new Product({name:'doll'});
// 	console.log(gift.name);
// });
var gift1 = new mongoOp({name:'http://brilliantentertainment.com/images/red-gift-box-gold-bow.png'});
gift1.save(function(err){
	if(err) return handleError(err);
	console.log('Yeap');
});

//var connection = mongoose.createConnection('mongodb://fengh:app@ec2-52-90-249-40.compute-1.amazonaws.com:27017/dummyDB');
//var product = connection.model('Product',schema);

// routes ======================================================================
// require('./app/wines.js')(app);
// app.get('/wines', wine.findAll);
// app.get('/wines/:id', wine.findById);
// app.post('/wines', wine.addWine);
// app.put('/wines/:id', wine.updateWine);
// app.delete('/wines/:id', wine.deleteWine);
router.get("/",function(req,res){
	res.json({"error":false,"message":"Hello World"});
});

router.route("/users")
.get(function(req,res){
	var	response={};
	mongoOp.find({},function(err,data){
		if(err){
			response={"error":true,"message":"Error fetching data"};
		}
		else{
			response={"error":false,"message":data};
		}
		res.json(response);
	});
});

app.use('/',router);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);









