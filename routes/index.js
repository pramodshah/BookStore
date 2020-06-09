var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var Book = require('../models/Book');
var fs = require('fs');
var async = require("async");
var Category = require('../models/category');

router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
    //   cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname)); old one
      cb(null,+Date.now()+file.originalname);
    }
});

var upload = multer({
    storage:Storage
}).single('file');
  
 


// router.get('/',(req,res)=>{
//     Category.find({},function(err,categories){
//         res.render('welcome',{categories:categories});
//     });
// });
// router.get('/',(req,res)=>{
    
//     Book.find({},function(err,books){
//         res.render('welcome',{books:books});
//     });
// });

router.get('/',(req,res)=>{
    var locals = {};
    
    var tasks = [
        // Load categories
        function(callback) {
            Category.find({},(function(err, categories) {
                if (err) return callback(err);
                locals.categories = categories;
                callback();
            }));
        },
        // Load books
        function(callback) {
            Book.find({},(function(err, books) {
                if (err) return callback(err);
                locals.books = books;
                callback();
            }));
        }
    ];

    async.parallel(tasks, function(err) {
        res.render('welcome', locals);
    });
});


    

router.get('/view/:id',(req,res)=>{
    var id = req.params.id
    Book.findById(id,function(err,book){
        
        res.render('viewbookDetails',{book:book});

    });
    
});







  
router.post('/book', upload,function(req, res) {
    var imageFile=req.file.filename;
    var newBook = new Book();
    newBook.bookname = req.body.bookname;
    newBook.author = req.body.author;
    newBook.price = req.body.price;
    newBook.dimension = req.body.dimension;
    newBook.edition = req.body.edition;
    newBook.language = req.body.language;
    newBook.publisher = req.body.publisher;
    newBook.description = req.body.description;
    newBook.category = req.body.category;
    newBook.image = imageFile;
    
    newBook.save(function(err,doc){
        if(err) throw err;
        Category.find({},function(err,categories){
            res.render('addBook',{msg:"Book details Submitted Succesfully",categories:categories});

        })
        
    });
});


router.get('/book',(req,res)=>{
    Category.find({},function(err,categories){
        res.render('addBook',{categories:categories});

        console.log(categories);
});
    
});










// method one to upload image 











module.exports = router;