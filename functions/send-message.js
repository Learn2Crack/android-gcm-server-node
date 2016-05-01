var gcm = require('node-gcm');
var constants = require('../constants/constants.json');

exports.sendMessage = function(message,registrationId,callback){

	var message = new gcm.Message({data: {message: message}});
	var regTokens = [registrationId];
	var sender = new gcm.Sender(constants.gcm_api_key);
	sender.send(message, { registrationTokens: regTokens }, function (err, response) {

		if (err){

			console.error(err);
			callback(constants.error.msg_send_failure);

		} else 	{

			console.log(response);
			callback(constants.success.msg_send_success);
		}

	});

}