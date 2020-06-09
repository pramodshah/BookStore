var express = require("express");
var router = express.Router();
var fs = require('fs'); 
var path = require('path'); 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var app = express();
router.use(busboy());

// var multer = require('multer'); 
var Image = require('../models/gallery');
// var images = Image.find({});

router.use(express.static(__dirname+"./public/"));

// var storage = multer.diskStorage({
//     destination:"./public/uploads",
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+"-" + Date.now() + path.extname(file.originalname));
//     }
// })

// var upload = multer({
//     storage:storage
// }).single('file'); 
// router.get('gallery',function(req,res){
//     res.render('gallery',{title:"Upload File", success:" "});
// });  

router.get('/gallery',function(req,res){

        res.render('gallery');
});


router.post('/gallery',(req,res)=>{
    
});





module.exports = router;