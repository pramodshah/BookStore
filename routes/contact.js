var express = require("express");
var router = express.Router();

router.get('/contact',(req,res)=>{
    res.render('contact');
});

module.exports = router;
