var express = require("express");
var router = express.Router();
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
var Image = require('../models/gallery');
var images = Image.find({});

router.use(express.static(__dirname+"./public/"));

var storage = multer.diskStorage({
    destination:"./public/uploads",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"-" + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage:storage
}).single('file'); 
router.get('gallery',function(req,res){
    res.render('gallery',{title:"Upload File", success:" "});
});  

router.get('/gallery',function(req,res){
    images.exec(function(err,data){
        if(err) throw err;
        
        res.render('gallery',{title:"Upload File",data:data});
    })
});

router.post('/gallery',upload,function(req,res){
    var success= req.file.filename + "uploaded successfully";
    var imageFile = req.file.filename;
    var imageDetails = new Image({
        image:imageFile
    });
    imageDetails.save(function(err,doc){
        if(err) throw err;
        images.exec(function(err,data){
            if(err) throw err;
            res.render('gallery',{title:"Upload File",data:data});
        });
        
    }); 

});








module.exports = router;