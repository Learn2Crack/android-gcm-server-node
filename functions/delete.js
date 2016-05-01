var mongoose = require('mongoose');
var request = require('request');
var device = require('../models/device');
var constants = require('../constants/constants.json');


exports.removeDevice = function(registrationId,callback){


	device.findOneAndRemove({registrationId:registrationId},function(err){


		if (!err) {

			callback(constants.success.msg_del_success);

		} else {

			callback(constants.error.msg_del_failure);
		}

	});

}