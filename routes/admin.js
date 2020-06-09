var express = require('express');
var router = express.Router();
const User = require('../models/user');
const {ensureAuthenticated} = require('../config/auth');


router.get('/admin',ensureAuthenticated,(req,res)=>{
        res.render('adminpanel');
        
    });
    
        
router.get('/admin/users',ensureAuthenticated,(req,res)=>{
    
    User.find({},function(err, users) {
        if (err){
            res.redirect('/users/login/');

        }else{
            res.render("usersAdmin",{users:users});  
        }
    });
    
});
router.get('/admin/books',ensureAuthenticated,(req,res)=>{
    
    User.find({},function(err, books) {
        if (err){
            res.redirect('/users/login/');

        }else{
            res.render("booksAdmin",{books:books});  
        }
    });
    
});



module.exports = router;