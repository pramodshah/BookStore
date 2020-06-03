var express = require('express');
var router = express.Router();
var Category = require('../models/category');


router.get('/',function(req,res){
    Category.find({},function(err,categories){
        res.render('welcome',{categories:categories});
    });
});
    

module.exports = router;