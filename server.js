var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parse incoming requests as JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

//Test route (http://localhost:8080/api)
var router = express.Router();

//Default route (executes for all API actions)
router.use(function(request, response, next){
	console.log('Something is happening');
	next();
});

//GET route (test route)
router.get('/', function(request, response){
	response.json({message: 'Welcome to this basic API'});
});

router.route('/bears').post(function(request, response){
	//POST route (create new bear)
	var bear = new Bear();
	bear.name = request.body.name;
	bear.save(function(err){
		if(err)
		{
			response.send(err);
		}
		response.json({message: 'Bear named ' + bear.name + ' created!'});
	});
}).get(function(request, response){
	//GET route (get all bears)
	Bear.find(function(err, bears){
		if(err)
		{
			response.send(err);
		}
		response.json(bears);
	})
});

router.route('/bears/:bear_id').get(function(request, response){
	//GET route (get bear with ID)
	Bear.findById(request.params.bear_id, function(err, bear){
		if(err)
		{
			response.send(err);
		}
		response.json(bear);
	})
}).put(function(request, response){
	//PUT route (update bear name with ID)
	Bear.findById(request.params.bear_id, function(err, bear){
		if(err)
		{
			response.send(err);
		}
		var oldName = bear.name;
		bear.name = request.body.name;
		bear.save(function(err){
			if(err)
			{
				response.send(err);
			}
			response.json({message: 'Bear named ' +  oldName + ' changed to ' + bear.name})
		})
	})
}).delete(function(request, response){
	//DELETE route (delete bear with ID)
	Bear.remove({
		_id: request.params.bear_id
	}, function(err){
		if(err)
		{
			response.send(err);
		}
		response.json({message: 'Bear deleted.'});
	});
});

//Set prefix of all routes
app.use('/api', router);
//Start server
app.listen(port, function(){
	console.log('Listening on port ' + port);
});

//Connect to database
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/nodejs-rest-api-db');
//Get bear definition from bear.js
var Bear = require('./app/models/bear');