var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var Employer = mongoose.model('Employer');

exports.add = function(req, res) {
  if (req.body) {
    var employee = new Employee();
    console.log('add employee', req.body);
    // Add values to model
    employee.name = req.body.name;
    employee.role = req.body.role;
    employee.manager = req.body.manager;
    employee.employerId = req.body.employerId;

    // get the employer
    Employer.findOne({
        '_id': employee.employerId
      })
      .exec(function(err, savedEmployer) {
        if (err) {
          throw err;
        }
        console.log('found the employer',savedEmployer);
        if (savedEmployer) {
          // Save to database
          employee.save(function(err, savedEmployee) {
            if (err) {
              res.send({
                error: "An error has occured while attempting to add your record."
              });
            }

            savedEmployer.employees.push(savedEmployee);
            savedEmployer.save(function(err, data) {
              if (err) {
                throw err;
              }
              return res.send(savedEmployee);
            });

          });
        }

      });


  } else {
    res.send({
      message: "Request body not defined."
    });
  }

};

exports.get = function(req, res) {
  Employee.findOne({
      '_id': req.params.id
    })
    .exec(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
};

exports.getAll = function(req, res) {
  var query = Employee.find();
  query.exec(function(err, docs) {
    if (err) {
      res.send({
        error: "An error has occured while attempting to retrieve your records."
      });
    }
    res.send(docs);
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
