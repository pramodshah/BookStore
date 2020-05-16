var express = require("express");
var router = express.Router();

router.get('/features',(req,res)=>{
    res.render('features');
});

module.exports = router;
