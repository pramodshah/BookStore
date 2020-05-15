var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');

const app = express();

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

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

// Database connection method 1 on mongoDB Atlas

// const uri = "mongodb+srv://pramodshah:Prime123$5@bookstore-k6wkq.mongodb.net/test?retryWrites=true&w=majority";
// mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){
//         console.log("MongoDB Connected...");
//     }else{
//         console.log(err);
//     }
// });


// Database connection method 2 on mongoDB Atlas

var  db = require('./config/keys').MongoURI;

mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true}).then((err)=>{
    if(!err){
        console.log("MongoDB Connected...");
    }else{
        console.log(err);
    }
});


// Database connection method 3 on local computer

// var db = 'mongodb://localhost:27017/bookstore';
// mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
//     if(!err){
//         console.log("MongoDB connected...");
//     }else{
//         console.log(err);
//     }
// });



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
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){
    console.log("Server running on port: 3000");
});