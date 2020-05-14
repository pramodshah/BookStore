const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function(passport){ 
    passport.use(
        new localStrategy({usernameField:'email'},(email,password,done)=>{
            // match user
            User.findOne({email:email})
                .then(user=>{
                if(!user){
                    return done(null,false,{message:"Email is not registered,"});
                }

                // match password

                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err) throw err;

                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Password Incorrect'});
                    }
                })
                console.log(err);
            });
        })
    );
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user);
        })
    });
    
}