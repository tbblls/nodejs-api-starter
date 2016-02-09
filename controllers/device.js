var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var Helper = require('../helpers/modelHelpers');

exports.validate = function(accesscode) {
  console.log('validate', accesscode);

  return new Promise(function(resolve, reject) {

    Helper.findOne(Device, {
        'id': accesscode
      }, '')
      .then(function(results) {
        resolve(results ? true : false);
      })
      .catch(function(err) {
        reject("You do not have permission to use this API");
      });
  });
};
