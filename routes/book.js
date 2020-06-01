// method one to upload image 

var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var Book = require('../models/Book');
var mongodb = require('mongodb');

var fs = require('fs');

router.get('/book',(req,res)=>{
    res.render('book');
});

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init upload
var upload = multer({
    storage:storage,
    // limits :{fileSize:1000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('myImage');

function checkFileType(file,cb){
    // allowed extension
    const filetypes = /jpeg|jpg|png|gif/

    // chaek extension

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime 
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Images Only Allowed.')
    }


}


router.post('/book',(req,res,next)=>{

    
    upload(req,res,(err)=>{
        if(err){
            res.render('book',{
                msg: err
            })
        }else{
            if(req.file==undefined){
                res.render('book',{
                    msg:'No File selected.'
                });
            }else{
                var newBook = new Book();
                newBook.bookname = req.body.bookname;
                newBook.arthur = req.body.arthur;
                newBook.price = req.body.price;
                newBook.img = req.file.path;
                newBook.save();
                console.log(req.body);
                res.render('book',{
                    msg:'BooK Details Uploaded.',
                    file:req.file.path
                    
                });
                
            }
            
            
        }
    });
});


router.get('/view',(req,res)=>{
    Book.find({},(err,books)=>{
        if(err){
            res.json(err);
        }else{
            res.render('viewbookDetails',{books});
            console.log({book:books});
        }
    });
})

module.exports = router;