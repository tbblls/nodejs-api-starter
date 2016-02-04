var mongoose = require('mongoose');
var Employer = mongoose.model('Employer');

exports.add = function(req, res) {
  if (req.body) {
    var employer = new Employer();

    // Add values to model
    employer.name = req.body.name;
    employer.description = req.body.description;

    // Validation should go here
    // Employer name must be unique so check for existing before saving.

    Employer.findOne({
        'name': employer.name
      })
      .exec(function(err, result) {
        if (err) {
          throw err;
        }

        if (result) {
          res.send(result);
        } else {
          // Save to database
          employer.save(function(err, data) {
            if (err) {
              res.send({
                error: "An error has occured while attempting to add your record."
              });
            }
            res.send(data);
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
  Employer.findOne({
      '_id': req.params.id
    })
    .populate('employees')
    .exec(function(err, result) {
      if (err) {
        throw err;
      }
      res.send(result);
    });
};

exports.getAll = function(req, res) {
  var query = Employer.find();
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
