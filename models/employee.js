var mongoose = require('mongoose');

// define the schema for model
var employeeSchema = mongoose.Schema({
    name             : String,
    role             : String,
    manager          : String,
    employerId       : String
});

// create the model and expose it to our app
module.exports = mongoose.model('Employee', employeeSchema);
