var mongoose = require('mongoose');
var CategoryScahem = new mongoose.Schema({
    categoryName:String,
    date: { type: Date, default: Date.now }
});

var Category = mongoose.model('Category',CategoryScahem);
module.exports = Category;