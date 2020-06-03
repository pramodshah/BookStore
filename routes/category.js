var express = require("express");
var router = express.Router();
var Category = require('../models/category')
router.get('/category',function(req,res){
    res.render("addCategory")
});

router.post("/category",function(req,res){
    
    var category = new Category();
    category.categoryName= req.body.categoryName;
    category.save((err)=>{
        if(!err){
            req.flash('success_msg','You are successfully added category.');
            res.render('addCategory');
        }else{
            console.log(err);
        }
    })
    


})


module.exports = router;

