var express = require('express');
var router =  express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
// login page
router.get('/login',(req,res)=>{
    res.render('login');
});

// register page 
router.get('/register',(req,res)=>{
    res.render('register');
});

// register handle
router.post('/register',(req,res)=>{
    const {name, email, password ,password2 } = req.body;

    errors = [];
    if(!name || !email || !password || ! password2){
        errors.push({msg: "Please fill in fields"});
    }

    if(password!==password2){
        errors.push({msg:"Passwords do not match"});
    }

    if(password.length<6){
        errors.push({msg:"Password length should atleast 6 characters"});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }else{
        User.findOne({email:email})
        .then(user=>{
            if(user){
                errors.push({msg:"Email is already registered."});
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                    
                });

                // hash password

                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        // set password to hash
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save((err)=>{
                            if(!err){
                                req.flash('success_msg','You are successfully registered.');
                                res.redirect('/users/login');
                            }else{
                                console.log(err);
                            }
                        })

                    })
                })
                
            }
        });
    }

});


// login handle 

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);


});

module.exports = router;