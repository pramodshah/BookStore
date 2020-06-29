var express = require('express');
var router =  express.Router();

var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/User');
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);
// login page
router.get('/login',(req,res)=>{
    res.render('login',{csrfToken: req.csrfToken()});
});

// register page 
router.get('/register',(req,res)=>{
    res.render('register',{csrfToken:req.csrfToken()});
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
                                res.redirect('/user/login');
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
        successRedirect:'/',
        failureRedirect:'/user/login',
        failureFlash:true
    })(req,res,next);


});


// logout  handle

router.get('/logout',(req,res)=>{
    req.logout();
    
    req.session.cart=null;
    req.flash('success_msg','You are logged out');
    res.redirect('/'); 
});





module.exports = router;