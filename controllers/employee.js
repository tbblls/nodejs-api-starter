var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Employer = mongoose.model('Employer');
var Helper = require('../helpers/modelHelpers');

exports.add = function(req, res) {
  if (req.body) {
    var employer, savedEmployee;
    var employee = Helper.populate(new Employee(), req.body);

    Helper.findOne(Employer, {
      '_id': employee.employerId
    },'')
    .then(function(data){
      employer =  data;
      return Helper.save(employee);
    })
    .then(function(employee){
      savedEmployee = employee;
      employer.employees.push(employee);
      return Helper.save(employer);
    })
    .then(function(data){
      res.send(savedEmployee);
    });

  } else {
    res.send({
      message: "Request body not defined."
    });
  }

};

exports.get = function(req, res) {
  Helper.findOne(Employee, {
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
  Helper.find(Employee, '')
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
