var mongoose = require('mongoose'); 
  
var ImageSchema = new mongoose.Schema({ 
    image:String,
    
}); 
  
var Image = mongoose.model('Image', ImageSchema); 
module.exports = Image;