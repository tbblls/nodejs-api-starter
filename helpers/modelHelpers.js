// This function assumes that the request body matches the model
exports.populate = function populateModel(model, obj) {
  for (var prop in obj) {
    model[prop] = obj[prop];
  }
  return model;
};

// Generic save
exports.save = function save(model) {
  return new Promise(function(resolve, reject) {
    model.save(function(err, data) {
      if (err) {
        reject("An error has occured while attempting to add your record.");
      }
      resolve(data);
    });
  });

}

exports.findOne = function findOne(model, searchCriteria, populate) {
  return new Promise(function(resolve, reject) {
    var query = model.findOne(searchCriteria).populate(populate);
    query.exec(function(err, docs) {
      if (err) {
        reject(errMsg);
      }
      resolve(docs);
    });

  });
};

// populate can be a query allowing multiple fields to be loaded. Otherwise a single field can be specified.
exports.find = function find(model, populate) {
  var query = model.find()
    .populate(populate);
  return new Promise(function(resolve, reject) {
    query.exec(function(err, docs) {
      if (err) {
        reject(errMsg);
      }
      resolve(docs);
    })
  });

};
