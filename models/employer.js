var mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('./employee');

// define the schema for model
var employerSchema = mongoose.Schema({
    name             : String,
    description      : String,
    employees        : [{ type: Schema.Types.ObjectId, ref: 'Employee'}]
});

// create the model and expose it to our app
module.exports = mongoose.model('Employer', employerSchema);
