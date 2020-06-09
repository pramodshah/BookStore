var mongoose = require('mongoose'); 
  
var ImageSchema = new mongoose.Schema({
    newfile: Object,
    path: String
});
  
var Image = mongoose.model('Image', ImageSchema); 
module.exports = Image;