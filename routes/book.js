// method one to upload image 

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var Book = require('../models/Book');
var fs = require('fs');

router.use(express.static(__dirname+"./public/"));

var Storage= multer.diskStorage({
    destination:"./public/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });

  var upload = multer({
    storage:Storage
  }).single('file');
  
  
  router.post('/book', upload,function(req, res) {
    var imageFile=req.file.filename;
    var success =req.file.filename+ " uploaded successfully";
  
    var newBook = new Book();
    newBook.bookname = req.body.bookname;
    newBook.author = req.body.author;
    newBook.price = req.body.price;
    newBook.dimension = req.body.dimension;
    newBook.edition = req.body.edition;
    newBook.language = req.body.language;
    newBook.publisher = req.body.publisher;
    newBook.description = req.body.description;
    newBook.image = imageFile;
    newBook.save(function(err,doc){
        if(err) throw err;
        res.render('book');
    });
});

router.get('/book',(req,res)=>{
    res.render('book');
});

router.get('/view',(req,res)=>{
    Book.find({},(err,books)=>{
        if(err){
            res.json(err);
        }else{
            res.render('viewbookDetails',{books});
            
        }
    });
});

module.exports = router;