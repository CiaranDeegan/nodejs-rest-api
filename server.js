var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//Parse incoming requests as JSON
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

//Test route (http://localhost:8080/api)
var router = express.Router();
router.get('/', function(request, response){
	response.json({message: 'This is a basic API'});
});

//Set prefix of all routes
app.use('/api', router);
//Start server
app.listen(port, function(){
	console.log('Listening on port ' + port);
});