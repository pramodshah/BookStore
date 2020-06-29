var mongoose = require('mongoose');
var BookSchema = new mongoose.Schema({
    bookname:String,
    author: String,
    price: Number,
    dimension:String,
    edition:String,
    language:String,
    publisher:String,
    description:String,
    category:String,
    image:String,
    date: { type: Date, default: Date.now }

});

var Book = mongoose.model('Book',BookSchema);
module.exports = Book;

