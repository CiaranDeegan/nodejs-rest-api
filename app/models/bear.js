var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Define bear and its attributes
var BearSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Bear', BearSchema);