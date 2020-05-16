var express = require("express");
var router = express.Router();

router.get('/bookshelf',(req,res)=>{
    res.render('bookshelf');
});

module.exports = router;
