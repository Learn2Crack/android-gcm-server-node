var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var deviceSchema = mongoose.Schema({ 

	deviceName 		: String,
	deviceId		: String, 
	registrationId	: String
	
});

mongoose.connect('mongodb://localhost:27017/node-android-push');

module.exports = mongoose.model('device', deviceSchema);        