var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var async = require("async");
var {ensureAuthenticated} = require('../config/auth');
var Book = require('../models/Book');
var Category = require('../models/category');
var User = require('../models/User');
var Cart = require('../models/cart');



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
    var successMsg = req.flash('success'[0]);
    
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
        res.render('welcome',locals);
    });
});






    

router.get('/view/book/:id',(req,res)=>{
    var id = req.params.id
    Book.findById(id,function(err,book){
        
        res.render('viewbookDetails',{book:book});

    });
    
});


router.post('/addbook', upload,function(req, res) {
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
            res.render('addBook',{success_msg:"Book details Submitted Succesfully",categories:categories});

        })
        
    });
});


router.get('/addbook',(req,res)=>{
    Category.find({},function(err,categories){
        res.render('addBook',{categories:categories});

        console.log(categories);
    });
    
});

router.get('/edit/book/:id',(req,res)=>{
    var id = req.params.id;
    var locals ={};

    var tasks = [
        // Load categories
        function(callback) {
            Category.find({},(function(err, categories) {
                if (err) return callback(err);
                locals.categories = categories;
                callback();
            }));
        },
        // Load book
        function(callback) {
            Book.findById(id,(function(err, book) {
                if (err) return callback(err);
                locals.book = book;
                callback();
            }));
        }
    ];

    async.parallel(tasks, function(err) {
        res.render('editBook', locals);
    });

});

router.post('/updatebook',upload,(req,res)=>{
    
    var BookData ={
        bookname : req.body.bookname,
        author :req.body.author,
        price : req.body.price,
        dimension : req.body.dimension,
        edition : req.body.edition,
        language : req.body.language,
        publisher : req.body.publisher,
        description : req.body.description,
        category : req.body.category,
        image : req.file.filename,

    }
    
    

    
    Book.findB
     yIdAndUpdate(req.body.id,BookData,function(err,book){
        if(err) throw err;
        res.redirect('/admin/books');
    })

    
   
});

router.get('/delete/book/:id',(req,res)=>{
    var id = req.params.id;
    Book.findByIdAndDelete(id,function(err){
        if(err) throw err;
        res.redirect('/admin/books');

    });
    
});


router.get('/add-to-cart/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    Book.findById(productId, function (err, product) {
        if(err) throw err;
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function (req, res) {
    if(!req.session.cart){
        return res.render('shopping-cart',{products:null})
    }

    var cart = new Cart(req.session.cart.items);
    res.render('shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice});
});

router.get('/checkout',(req,res)=>{
    if(!req.session.cart){
        res.redirect('/shopping-cart')
    }
    var cart = new Cart(req.session.cart.items);
    
    res.render('checkout',{total:cart.totalPrice});
});

router.post('/checkout',(req,res)=>{
    if(!req.session.cart){
        res.redirect('shopping-cart')
    }
    var cart = new Cart(req.session.cart.items);
    
    var stripe = require('stripe')(
        "sk_test_51GvSsxK2NKNlgz4JxftwL2hUDcc584JAdpWsYm7czl69P87hv2hM1OWSyBl2lzO6lKy2Wp62ENsSMb2QDKRPluAp000dUZ7lE5"
    );
    const paymentIntent = stripe.paymentIntents.create({
        amount: cart.totalPrice*100,
        currency: 'inr',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
      },function(err,charge){
        if(err){
            req.flash('error_msg',err.message);
            return res.redirect('/checkout');
        }
        req.flash('success_msg',"Successfully Bought Product!")
        req.session.cart= null;
        res.redirect('/');
    });

    // stripe.charges.create({
    //     amount: cart.totalPrice * 100,
    //     currency: "usd",
    //     source: req.body.stripeToken, // obtained with Stripe.js
    //     description: "Test Charge"
    // },function(err,charge){
    //     if(err){
    //         req.flash('error_msg',err.message);
    //         return res.redirect('/checkout');
    //     }
    //     req.flash('success_msg',"Successfully Bought Product!")
    //     req.session.cart= null;
    //     res.redirect('/order');


    // });

    router.get('/order',(req,res)=>{
        res.render('order')
    })
})


module.exports = router;