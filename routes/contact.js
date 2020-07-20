var express = require("express");
var router = express.Router();
var Contact = require('../models/contact');

router.get('/contact',(req,res)=>{
    res.render('contact');
});
router.post('/contact',(req,res)=>{
    var newContact = new Contact();
    newContact.name=req.body.name;
    newContact.email= req.body.email;
    newContact.message = req.body.message;
    console.log(newContact)
    newContact.save((err)=>{
        if(!err){
            req.flash('success_msg','You have successfully submitted your  message.');
            res.redirect('/contact');
        }else{
            console.log(err);
        }
    })

});

module.exports = router;
