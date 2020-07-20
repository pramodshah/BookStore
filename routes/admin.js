var express = require('express');
var router = express.Router();

var {ensureAuthenticated} = require('../config/auth');
var User = require('../models/User');
var Book = require('../models/Book');
var Category = require('../models/category');
var Contact = require('../models/contact');


router.get('/admin',(req,res)=>{
        res.render('adminpanel');
        
    });
    
        
router.get('/admin/users',(req,res)=>{
    
    User.find({},function(err, users) {
        if(err) throw err;
       res.render("usersAdmin",{users:users});  
    });
    
});
router.get('/admin/books',(req,res)=>{
    
    Book.find({},function(err, books) {
        if(err) throw err;
        res.render("booksAdmin",{books:books});
    });
    
});

router.get('/addcategory',function(req,res){
    res.render("addCategory")
});

router.post("/addcategory",function(req,res){
    
    var category = new Category();
    category.categoryName= req.body.categoryName;
    category.save((err)=>{
        if(!err){
            req.flash('success_msg','You are successfully added category.');
            res.render('addCategory');
        }else{
            console.log(err);
        }
    });
    


});

router.get('/admin/contacts',(req,res)=>{
    Contact.find({},function(err,contacts){
        if(err) throw err;
        res.render("contactsAdmin",{contacts:contacts});

    })
})

router.get('/delete/contact/:id',(req,res)=>{
    var id = req.params.id;
    Book.findByIdAndDelete(id,function(err){
        if(err) throw err;
        res.redirect('/admin/contacts');

    });
    
});



module.exports = router;