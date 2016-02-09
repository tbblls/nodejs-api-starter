var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define the schema for model
var deviceSchema = mongoose.Schema({
    id             : String
});

// create the model and expose it to our app
module.exports = mongoose.model('Device', deviceSchema);
