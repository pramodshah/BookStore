var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');

router.get('/dashboard',(req,res)=>{
    res.render('dashboard');
});

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
// Init upload
var upload = multer({
    storage:storage,
    // limits :{fileSize:1000000},
    fileFilter:function(req,file,cb){
        checkFileType(file,cb);
    }
}).single('myImage');

function checkFileType(file,cb){
    // allowed extension
    const filetypes = /jpeg|jpg|png|gif/

    // chaek extension

    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // check mime 
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Images Only Allowed.')
    }


}

router.post('/dashboard',(req,res,next)=>{
    upload(req,res,(err)=>{
        if(err){
            res.render('dashboard',{
                msg: err
            })
        }else{
            if(req.file==undefined){
                res.render('dashboard',{
                    msg:'No File selected.'
                });
            }else{
                res.render('dashboard',{
                    msg:'Photo Uploaded',
                    file:req.file
                })
            }
            
        }
    });
});
    // db.collection('image').insertOne(file,(err,result)=>{
    //     console.log(result);
    //     if(err){
    //         console.log(err);
    //     }{
    //         console.log("Image saved to database");
            
    //     }
    // });





module.exports = router;