var express = require("express");
var router = express.Router();
const User = require('../models/User');

router.get('/dashboard',(req,res)=>{
    User.find(function(err, users) {
        if (err){
            res.render('dashboard');
        }else{
            console.log(users);
            res.render("dashboard",{users:users,count:1})
        }
    });
    
});

module.exports = router;
