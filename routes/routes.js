var constants = require('../constants/constants.json');
var registerFunction = require('../functions/register');	
var devicesFunction = require('../functions/devices');
var deleteFunction = require('../functions/delete');
var sendFunction = require('../functions/send-message');

module.exports = function(app,io) {


	io.on('connection', function(socket){

		console.log("Client Connected");
		socket.emit('update', { message: 'Hello Client',update:false });

  		socket.on('update', function(msg){

    		console.log(msg);
  		});
	});

	app.get('/',function(req,res) {

		res.sendFile('index.html');
		
	});

	app.post('/devices',function(req,res) {

		var deviceName = req.body.deviceName;
		var deviceId   = req.body.deviceId;
		var registrationId = req.body.registrationId;

		if ( typeof deviceName  == 'undefined' || typeof deviceId == 'undefined' || typeof registrationId  == 'undefined' ) {

			console.log(constants.error.msg_invalid_param.message);

			res.json(constants.error.msg_invalid_param);

		} else if ( !deviceName.trim() || !deviceId.trim() || !registrationId.trim() ) {

			console.log(constants.error.msg_empty_param.message);

			res.json(constants.error.msg_empty_param);

		} else {

			registerFunction.register( deviceName, deviceId, registrationId, function(result) {

				res.json(result);

				if (result.result != 'error'){

					io.emit('update', { message: 'New Device Added',update:true});

				}
			});
		}
	});

	app.get('/devices',function(req,res) {

		devicesFunction.listDevices(function(result) {

			res.json(result);

		});
	});

	app.delete('/devices/:device',function(req,res) {

		var registrationId = req.params.device;

		deleteFunction.removeDevice(registrationId,function(result) {

			res.json(result);

		});


	});

	app.post('/send',function(req,res){

		var message = req.body.message;
		var registrationId = req.body.registrationId;

		sendFunction.sendMessage(message,registrationId,function(result){

			res.json(result);
		});
	});

}