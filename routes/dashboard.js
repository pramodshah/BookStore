var express = require("express");
var router = express.Router();
const User = require('../models/User');
const {ensureAuthenticated} = require('../config/auth');

router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    User.find({},function(err, users) {
        if (err){
            res.render('dashboard');

        }else{
            res.render("dashboard",{users:users})
        }
    });
    
});

module.exports = router;
