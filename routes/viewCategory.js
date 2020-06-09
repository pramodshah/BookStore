var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

router.get('/viewCategory/:category',(req,res)=>{
    var category = req.params.category;
    Book.find({'category':category},function(error,categories){
        res.render('viewCategory',{categories:categories});
    })
    
})

module.exports = router;