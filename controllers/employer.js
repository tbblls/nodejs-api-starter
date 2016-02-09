var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');
var Helper = require('../helpers/modelHelpers');


exports.add = function(req, res) {
  if (req.body) {
    var employer = Helper.populate(new Employer(), req.body);

    // Validation should go here
    // Employer name must be unique so check for existing before saving.

    Helper.findOne(Employer, {
        'name': employer.name
      },'employees')
      .then(function(data) {
        return data ? data : Helper.save(employer);
      })
      .then(function(data) {
        res.send(data);
      });

  } else {
    res.send({
      message: "Request body not defined."
    });
  }

};

exports.get = function(req, res) {

  Helper.findOne(Employer, {
      '_id': req.params.id
    }, 'employees')
    .then(function(results) {
      if (results) {
        res.send(results);
      }
    })
    .catch(function(err) {
      res.send({
        error: "An error has occured while attempting to retrieve your record."
      });
    });

};

exports.getAll = function(req, res) {
  Helper.find(Employer, 'employees')
    .then(function(results) {
      if (results) {
        res.send(results);
      }
    })
    .catch(function(err) {
      res.send({
        error: "An error has occured while attempting to retrieve your record."
      });
    });
};

exports.update = function(req, res) {
  console.log('test update');
  res.send("Success");
};

exports.delete = function(req, res) {
  console.log('test delete');
  res.send("Success");
};
