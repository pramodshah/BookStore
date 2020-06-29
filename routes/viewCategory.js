var express = require('express');
var router = express.Router();
var Book = require('../models/Book');

router.get('/view-category/:category',(req,res)=>{
    var category = req.params.category;
    Book.find({'category':category},function(error,books){
        res.render('viewCategory',{books:books});
    })
    
})

module.exports = router;