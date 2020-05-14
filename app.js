var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

require('./config/passport')(passport);


const app = express();

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
// global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());

// DB Config 
// var  db = require('./config/keys').MongoURI;

// mongoose.connect(db,{useNewUrlParser:true}).then((err)=>{
//     if(!err){
//         console.log("MongoDB Connected...");
//     }else{
//         console.log(err);
//     }
// });


var mongooose = require('mongoose');
mongooose.connect('mongodb://localhost:27017/bookstore',{useNewUrlParser:true},(err)=>{
    if(!err){
        console.log("MongoDB connected...");
    }else{
        console.log(err);
    }
});



// static file
app.use('/static', express.static(path.join(__dirname,'/public')));

// view engine
app.use(expressLayouts);
app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
 
// routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

// server port
app.listen(3000,function(req,res){
    console.log("Server running on port 3000");
});