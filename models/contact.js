var mongoose = require('mongoose');
var ContactSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String
    
});

var Contact = mongoose.model('Contact',ContactSchema);
module.exports = Contact;
